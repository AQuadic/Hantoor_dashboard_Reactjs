import * as React from "react";
import { cn } from "@/lib/utils";

function Table({ className, ...props }: React.ComponentProps<"table">) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Check if there's horizontal overflow
      if (container.scrollWidth > container.clientWidth) {
        // Prevent vertical scrolling when we're handling horizontal scroll
        e.preventDefault();

        // Scroll horizontally based on wheel delta
        // Use deltaY for vertical wheel, deltaX for horizontal wheel/trackpad
        const scrollAmount = e.deltaY !== 0 ? e.deltaY : e.deltaX;
        container.scrollLeft += scrollAmount;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn(
          "w-full caption-bottom text-sm border-separate border-spacing-y-4 ",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        "[&_tr]:border-b-0 rounded-full overflow-hidden",
        "[&_tr>th]:bg-[#2A32F80D] [&_tr>th]:border-0 ",
        "[&_tr>th:first-child]:rounded-s-full [&_tr>th:first-child]:ps-6 ",
        "[&_tr>th:last-child]:rounded-e-full [&_tr>th:last-child]:pe-6",
        "[&_tr>th]:text-primary [&_tr>th]:font-bold [&_tr>th]:ltr:text-left",
        className,
      )}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b-0 overflow-hidden transition-colors",
        // White background for all cells except last
        "[&>td]:bg-white [&>td]:border-0",
        "[&>td:last-child]:bg-transparent",
        // LTR/RTL friendly styling
        "[&>td:first-child]:rounded-s-full [&>td:first-child]:ps-6",
        "[&>td:nth-last-child(2)]:rounded-e-full [&>td:nth-last-child(2)]:pe-6",
        "[&>td]:h-[58px]",
        "data-[state=selected]:[&>td:not(:last-child)]:bg-muted",
        // Add spacing using transform (works but not ideal)
        "before:content-[''] before:block before:h-4",
        "after:content-[''] after:block after:h-4",
        className,
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
