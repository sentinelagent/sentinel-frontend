import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { Fragment } from "react";

interface BreadcrumbItemData {
    label: string;
    href?: string;
}

interface PageHeaderProps {
    breadcrumbs?: BreadcrumbItemData[];
    title: string;
    subtitle?: string;
    className?: string;
    actions?: React.ReactNode;
}

export function PageHeader({
    breadcrumbs,
    title,
    subtitle,
    className,
    actions,
}: PageHeaderProps) {
    return (
        <div className={cn("space-y-6 mb-8", className)}>
            {breadcrumbs && breadcrumbs.length > 0 && (
                <Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumbs.map((item, index) => (
                            <Fragment key={index}>
                                <BreadcrumbItem>
                                    {item.href ? (
                                        <BreadcrumbLink
                                            href={item.href}
                                            className="text-[10px] font-bold uppercase tracking-widest hover:text-black transition-colors"
                                        >
                                            {item.label}
                                        </BreadcrumbLink>
                                    ) : (
                                        <BreadcrumbPage className="text-[10px] font-bold uppercase tracking-widest text-black/40">
                                            {item.label}
                                        </BreadcrumbPage>
                                    )}
                                </BreadcrumbItem>
                                {index < breadcrumbs.length - 1 && (
                                    <BreadcrumbSeparator className="text-black/20 text-[10px]" />
                                )}
                            </Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            )}

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                    {subtitle && (
                        <div className="text-[10px] font-bold uppercase tracking-widest text-black/40">
                            {subtitle}
                        </div>
                    )}
                    <h1 className="text-3xl font-bold tracking-tight uppercase italic underline decoration-black/10 underline-offset-8">
                        {title}
                    </h1>
                </div>

                {actions && (
                    <div className="flex items-center gap-2">
                        {actions}
                    </div>
                )}
            </div>
        </div>
    );
}
