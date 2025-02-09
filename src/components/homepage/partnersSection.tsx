type Props = {};

interface PartnerItemProps {
  name: string;
  iamgeSrc: string;
  href: string;
}

const PartnerItem = ({ name, iamgeSrc, href }: PartnerItemProps) => {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        className="flex gap-4 px-1 py-2 items-center hover:shadow hover:text-blue-400 "
      >
        <img className="h-4 w-4" src={iamgeSrc} alt={`partner ${name}`} />
        <span>{name}</span>
      </a>
    </li>
  );
};

const partners: PartnerItemProps[] = [
  {
    name: "NewsApi",
    iamgeSrc: "/newsapi_favicon.png",
    href: "https://newsapi.org/",
  },
  {
    name: "The NewYork Times",
    iamgeSrc: "/ny_times_favicon.ico",
    href: "https://www.nytimes.com/international/",
  },
  {
    name: "Guardian News",
    iamgeSrc: "/guardiannews_favicon.ico",
    href: "https://www.theguardian.com/international",
  },
];

const PartnersSection = ({}: Props) => {
  return (
    <section className="">
      <div className="container ">
        <h2 className="text-2xl   mb-2 text-blue-500">Our News Partners</h2>
        <ul className="bg-white rounded p-4 space-y-1">
          {partners.map((partner) => (
            <PartnerItem key={partner.name} {...partner} />
          ))}
        </ul>
      </div>
    </section>
  );
};
export default PartnersSection;
