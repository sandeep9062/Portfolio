interface TitleHeaderProps {
  title: string;
  sub: string;
}

const TitleHeader = ({ title, sub }: TitleHeaderProps) => {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="hero-badge">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">{sub}</p>
      </div>
      <div>
        <h2 className="font-display tracking-tight font-semibold md:text-5xl text-3xl text-center text-foreground">
          {title}
        </h2>
      </div>
    </div>
  );
};

export default TitleHeader;