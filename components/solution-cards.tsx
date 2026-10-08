import Link from "next/link";
import solutions from "@/data/solutions.json";
export default function SolutionCards() {
  return <div className="solution-grid">{solutions.map(item => <Link className="solution-card" key={item.slug} href={`/solution/${item.slug}`}>
    <img src={item.cover} alt={item.title} width={600} height={380} />
    <h2>{item.title}</h2><p>{item.description}</p>
    <div className="solution-tags"><span>Featured</span><span>Beginner</span></div>
  </Link>)}</div>;
}
