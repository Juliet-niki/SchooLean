// import * as React from "react";
// import { cva, type VariantProps } from "class-variance-authority";
// import { Slot } from "radix-ui";

// import { cn } from "~/lib/utils";

// const buttonVariants = cva(
//   "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
//   {
//     variants: {
//       variant: {
//         default: "bg-[#0B653E] text-primary-foreground hover:bg-[#0B653E]/90",
//         destructive:
//           "bg-[#DD3232] text-white hover:bg-[#DD3232]/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
//         outline:
//           "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
//         secondary:
//           "bg-secondary text-secondary-foreground hover:bg-secondary/80",
//         ghost:
//           "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
//         link: "text-primary underline-offset-4 hover:underline",
//       },
//       size: {
//         default: "h-9 px-4 py-2 has-[>svg]:px-3",
//         xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
//         sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
//         lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
//         icon: "size-9",
//         "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
//         "icon-sm": "size-8",
//         "icon-lg": "size-10",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//     },
//   },
// );

// function Button({
//   className,
//   variant = "default",
//   size = "default",
//   asChild = false,
//   ...props
// }: React.ComponentProps<"button"> &
//   VariantProps<typeof buttonVariants> & {
//     asChild?: boolean;
//   }) {
//   const Comp = asChild ? Slot.Root : "button";

//   return (
//     <Comp
//       data-slot="button"
//       data-variant={variant}
//       data-size={size}
//       className={cn(buttonVariants({ variant, size, className }))}
//       {...props}
//     />
//   );
// }

// export { Button, buttonVariants };

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Spinner } from "./spinner";
import { Link } from "react-router";
import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap rounded-md text-[clamp(14px,1.5vw,16px)] font-medium transition-all disabled:pointer-events-none disabled:opacity-50  outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive ",
  {
    variants: {
      variant: {
        default:
          "bg-[#0B653E] text-primary-foreground text-white shadow-xs hover:bg-[#0B653E]/90",
        destructive:
          "bg-[#DD3232] text-white shadow-xs hover:bg-[#DD3232]/90 focus-visible:ring-[#DD3232]/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border-[#DEE2E5] border-[2px] text-[#333333] bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-[#F3F3F3] text-[#333333] shadow-xs hover:bg-[#F3F3F3]/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-6 sm:h-7 md:h-8 px-4 py-2",
        sm: "h-8 rounded-md gap-1.5 px-3",
        lg: "h-14 rounded-md px-6",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, href, ...props }, ref) => {
    return href ? (
      <Link
        to={href}
        className={cn(buttonVariants({ variant, size, className }))}
      >
        {props.children}
      </Link>
    ) : (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {props.children}
        {loading && <Spinner className="h-6 w-6 ml-2" />}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
