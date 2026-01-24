import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";


export default function HomePage() {
  return (
    <>
      <CardHeader className="px-0">
        <CardTitle>Home</CardTitle>
        <CardDescription>
          Where it all starts.
        </CardDescription>
      </CardHeader>
    </>
  );
}
