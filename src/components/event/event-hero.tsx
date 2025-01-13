import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface EventHeroProps {
  name: string;
  date: string;
  image: string;
}

export function EventHero({ name, date, image }: EventHeroProps) {
  return (
    <div className="relative h-[600px] w-full mb-3 bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-transparent/80 to-transparent/10" />
      </div>

      <div className="container relative h-full">
        <div className="absolute bottom-16 max-w-2xl space-y-3">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            {name}
          </h1>
          <div>
            <p className="text-lg text-white/90">
              {format(
                new Date(date),
                "EEEE, dd 'de' MMMM 'de' yyyy 'às' HH:mm",
                {
                  locale: ptBR,
                }
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
