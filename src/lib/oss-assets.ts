import { createHmac } from "crypto";

type OssConfig = {
  bucket: string;
  endpoint: string;
  accessKeyId: string;
  accessKeySecret: string;
};

function getOssConfig(): OssConfig {
  const bucket = process.env.OSS_BUCKET || process.env.ALIYUN_OSS_BUCKET || "img-12345";
  const endpoint = (process.env.OSS_ENDPOINT || process.env.ALIYUN_OSS_ENDPOINT || "oss-cn-beijing.aliyuncs.com")
    .replace(/^https?:\/\//, "")
    .replace(/\/+$/, "");
  const accessKeyId =
    process.env.OSS_ACCESS_KEY_ID ||
    process.env.ALIYUN_OSS_ACCESS_KEY_ID ||
    process.env.ALIBABA_CLOUD_ACCESS_KEY_ID ||
    "";
  const accessKeySecret =
    process.env.OSS_ACCESS_KEY_SECRET ||
    process.env.ALIYUN_OSS_ACCESS_KEY_SECRET ||
    process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET ||
    "";

  if (!accessKeyId || !accessKeySecret) {
    throw new Error("OSS credentials are not configured.");
  }

  return {
    bucket,
    endpoint,
    accessKeyId,
    accessKeySecret,
  };
}

function objectKeyFromPublicPath(publicPath: string) {
  return publicPath.replace(/^\/+/, "");
}

function encodeObjectKey(objectKey: string) {
  return objectKey
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function signOssRequest(input: {
  method: "DELETE" | "PUT";
  contentType: string;
  date: string;
  objectKey: string;
  config: OssConfig;
}) {
  const canonicalResource = `/${input.config.bucket}/${input.objectKey}`;
  const stringToSign = [
    input.method,
    "",
    input.contentType,
    input.date,
    canonicalResource,
  ].join("\n");
  const signature = createHmac("sha1", input.config.accessKeySecret).update(stringToSign).digest("base64");

  return `OSS ${input.config.accessKeyId}:${signature}`;
}

async function sendOssRequest(input: {
  method: "DELETE" | "PUT";
  publicPath: string;
  body?: Buffer;
  contentType?: string;
}) {
  const config = getOssConfig();
  const objectKey = objectKeyFromPublicPath(input.publicPath);
  const date = new Date().toUTCString();
  const contentType = input.contentType ?? "";
  const host = `${config.bucket}.${config.endpoint}`;
  const authorization = signOssRequest({
    method: input.method,
    contentType,
    date,
    objectKey,
    config,
  });
  const response = await fetch(`https://${host}/${encodeObjectKey(objectKey)}`, {
    method: input.method,
    headers: {
      Authorization: authorization,
      Date: date,
      Host: host,
      ...(contentType ? { "Content-Type": contentType } : {}),
    },
    body: input.body,
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`OSS ${input.method} failed: ${response.status} ${body.slice(0, 300)}`);
  }
}

export async function uploadPublicAssetToOss(input: {
  publicPath: string;
  buffer: Buffer;
  contentType: string;
}) {
  await sendOssRequest({
    method: "PUT",
    publicPath: input.publicPath,
    body: input.buffer,
    contentType: input.contentType,
  });
}

export async function deletePublicAssetFromOss(publicPath: string) {
  await sendOssRequest({
    method: "DELETE",
    publicPath,
  });
}
