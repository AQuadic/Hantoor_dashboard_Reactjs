import * as React from "react";
import { cn } from "@/lib/utils";

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        "[&_tr]:border-b-0 rounded-full overflow-hidden",
        "[&_tr>th]:bg-[#2A32F80D] [&_tr>th]:border-0",
        // Logical border radius for first/last cell in both LTR and RTL
        "[&_tr>th:first-child]:rounded-s-full [&_tr>th:last-child]:rounded-e-full",
        // Logical padding for first/last cell in both LTR and RTL
        "[&_tr>th:first-child]:ps-6 [&_tr>th:last-child]:pe-6",
        // Consistent horizontal padding for all
        "[&_tr>th]:px-6",
        "[&_tr>th]:text-primary [&_tr>th]:font-bold",
        "ltr:[&_tr>th]:text-left rtl:[&_tr>th]:text-right",
        className
      )}
      {...props}
    >
      {props.children}
    </thead>
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    >
      {props.children}
    </tbody>
  );
}

function Table({ className, ...props }: React.ComponentProps<"table">) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (container.scrollWidth > container.clientWidth) {
        e.preventDefault();
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
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <table
        data-slot="table"
        className={cn(
          "w-full caption-bottom text-sm border-separate border-spacing-y-4 ",
          className
        )}
        {...props}
      >
        {props.children}
      </table>
    </div>
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    >
      {props.children}
    </tfoot>
  );
}

interface TableRowProps extends React.ComponentProps<"tr"> {
  noBackgroundColumns?: number;
}

function TableRow({
  className,
  children,
  noBackgroundColumns = 0,
  ...props
}: TableRowProps) {
  const totalColumns = React.Children.count(children);
  const bgColumns = totalColumns - noBackgroundColumns;

  const updatedChildren = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;

    // Apply bg-muted class conditionally based on column index
    const isBgColumn = index < bgColumns;
    const additionalClass = isBgColumn ? "bg-white" : "";

    return React.cloneElement(child, {
      className: cn(child.props.className, additionalClass),
    });
  });

  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b-0 overflow-hidden transition-colors",
        
        "[&>td]:border-0",
        "[&>td]:px-6",
        "[&>td:first-child]:rounded-s-full [&>td:nth-last-child(2)]:rounded-e-full",
        "[&>td:first-child]:ps-6 [&>td:last-child]:pe-6",
        "[&>td]:h-[58px]",
        "ltr:[&>td]:text-left rtl:[&>td]:text-right",
        "before:content-[''] before:block before:h-4",
        "after:content-[''] after:block after:h-4",
        className
      )}
      {...props}
    >
      {updatedChildren}
    </tr>
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    >
      {props.children}
    </th>
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    >
      {props.children}
    </td>
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
    >
      {props.children}
    </caption>
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
