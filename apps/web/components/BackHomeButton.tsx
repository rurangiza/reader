import { ArrowLeft } from "lucide-react";
import Link from "next/link";


export function BackHomeButton() {
  return <Link className="fixed top-24 flex flex-row items-center text-sm leading-none font-medium text-stone-400 hover:text-stone-700  w-fit" href={"/books"}>
      <ArrowLeft className="mr-2" size={18}/>
      Back to the library
    </Link>
}