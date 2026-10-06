interface ExpContentData {
  title: string;
  date: string;
  responsibilities: string[];
}

const ExpContent = ({ expContent }: { expContent: ExpContentData }) => {
  return (
    <div className="card-border rounded-xl p-10">
      <h3 className="font-display tracking-tight font-semibold text-3xl text-foreground">{expContent.title}</h3>
      <p className="text-muted">{expContent.date}</p>
      <p className="text-foreground">Responsibilities</p>
      <ul className="list-disc ms-5 text-muted">
        {expContent.responsibilities.map((responsibility, index) => (
          <li key={index}>{responsibility}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExpContent;