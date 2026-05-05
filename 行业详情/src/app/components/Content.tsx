function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-[1rem] text-[#99a1af] text-[1.25rem] leading-[1.6] tracking-[0.02em] font-light">
      <span className="mt-[0.6rem] inline-block w-[0.5rem] h-[0.5rem] rounded-full bg-[#d9d9d9] flex-shrink-0" />
      <span>{children}</span>
    </li>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#1a1a1a] border border-white/[0.05] px-[2.5rem] py-[2rem]">
      {children}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[#e5e5e5] text-[1.25rem] leading-[1.5] tracking-[0.02em] font-normal">
      {children}
    </h3>
  );
}

export function Content() {
  return (
    <section className="relative bg-[#171717]">
      <div className="mx-auto max-w-[120rem] px-[2.5rem] lg:px-[3rem] xl:px-[3.5rem]">
        <div className="lg:ml-[26rem] xl:ml-[28rem] max-w-[70rem] flex flex-col gap-[1.5rem] pb-[8rem]">
          <p className="text-[#d1d5dc] text-[1.25rem] leading-[1.8] tracking-[0.02em] mb-[1rem]">
            In the event of investment in private equity or private funds under
            the mode of trust, limited partnership or company, etc.:
          </p>

          <Card>
            <SectionHeading>
              1、Analysis of potential legal exposures in contracts such as
              partnership agreements or investment agreements
            </SectionHeading>
          </Card>

          <Card>
            <SectionHeading>
              2、Pre-litigation dispute resolution services:
            </SectionHeading>
            <ul className="mt-[1.5rem] flex flex-col gap-[1rem]">
              <Bullet>
                Drafting and sending repurchase notice, deficiency supplement
                notice and other legal letters on behalf of investors;
              </Bullet>
              <Bullet>
                Calculating the specific claimable amount, including but not
                limited to investment principal, overdue payment interest,
                repurchase amount, etc.;
              </Bullet>
              <Bullet>Participating in negotiations;</Bullet>
              <Bullet>
                Drafting and assisting in signing settlement agreements, etc.
              </Bullet>
            </ul>
          </Card>

          <Card>
            <SectionHeading>
              3、On behalf of investors, fund managers or invested companies:
            </SectionHeading>
            <ul className="mt-[1.5rem] flex flex-col gap-[1rem]">
              <Bullet>Initiating litigation or arbitration;</Bullet>
              <Bullet>
                Initiating pre-litigation preservation or preservation in
                litigation (including judicial preservation against the bank
                accounts, equity interests or investment proceeds of the
                counterparty);
              </Bullet>
              <Bullet>Responding to claims or filing counterclaims;</Bullet>
              <Bullet>Initiating application for enforcement;</Bullet>
              <Bullet>
                In the litigation or arbitration proceedings, assisting in
                preservation or enforcement proceedings by visiting institutions
                in person, such as Shanghai Stock Exchange or China Securities
                Depository and Clearing Corporation Limited;
              </Bullet>
              <Bullet>
                Participating in negotiations for settlement or mediation.
              </Bullet>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}
