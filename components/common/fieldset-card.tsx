import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface FieldsetCardProps {
    legend?: string;
    children: ReactNode;
    className?: string;
    dashed?: boolean;
}

export function FieldsetCard({
    legend,
    children,
    className,
    dashed = false,
}: FieldsetCardProps) {
    return (
        <Card className={cn(
            "relative rounded-none border border-black bg-white shadow-none pt-2",
            dashed && "border-dashed",
            className
        )}>
            {legend && (
                <div className="absolute -top-[10px] left-4 bg-white px-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-black/60 leading-none">
                        {legend}
                    </span>
                </div>
            )}
            <CardContent className="p-6">
                {children}
            </CardContent>
        </Card>
    );
}
