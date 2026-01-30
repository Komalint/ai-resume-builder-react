import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner";

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group **:data-sonner-toast:backdrop-blur
      **:data-sonner-toast:bg-black
    **:data-sonner-toast:text-white
    **:data-sonner-toast:border-zinc-800
    **:data-sonner-toast:shadow-xl
    [&_[data-sonner-toast]_svg]:text-white"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      
      {...props} />
  );
}

export { Toaster }
