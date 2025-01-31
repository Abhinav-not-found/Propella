import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Component({ data }) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          {data.priority == "High" ? (
            <div className="bg-red-500 rounded-full w-3 h-3"></div>
          ) : data.priority == "Mid" ? (
            <div className="bg-yellow-500 rounded-full w-3 h-3"></div>
          ) : (
            <div className="bg-green-500 rounded-full w-3 h-3"></div>
          )}
        </TooltipTrigger>
        <TooltipContent className="px-2 py-1 mb-2 text-xs">
          Priority Level
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
