interface OrganizerInfoProps {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
}

const OrganizerInfo: React.FC<OrganizerInfoProps> = ({
  name,
  email,
  phone,
  whatsapp,
}) => (
  <div className="rounded-lg border bg-card p-6">
    <h3 className="mb-4 text-lg font-semibold">Organizador</h3>
    <div className="space-y-2">
      <p>{name}</p>
      <p>
        <a href={`mailto:${email}`} className="text-primary hover:underline">
          {email}
        </a>
      </p>
      <p>
        <a href={`tel:${phone}`} className="text-primary hover:underline">
          {phone}
        </a>
      </p>
      <p>
        <a
          href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          WhatsApp
        </a>
      </p>
    </div>
  </div>
);

export default OrganizerInfo;
