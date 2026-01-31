import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
    id: number;
    label: string;
    completed?: boolean;
}

interface StepIndicatorProps {
    steps: Step[];
    currentStep: number;
    className?: string;
}

export function StepIndicator({
    steps,
    currentStep,
    className,
}: StepIndicatorProps) {
    return (
        <div className={cn("flex items-center justify-between gap-4", className)}>
            {steps.map((step, index) => (
                <div key={step.id} className="flex flex-1 items-center gap-4">
                    <div className="flex flex-col items-center gap-1 group">
                        <div
                            className={cn(
                                "flex h-8 w-8 items-center justify-center border-2 transition-all duration-300",
                                step.completed
                                    ? "border-black bg-black text-white"
                                    : currentStep === step.id
                                        ? "border-black bg-white text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                                        : "border-black/10 bg-white text-black/20"
                            )}
                        >
                            {step.completed ? (
                                <Check className="h-4 w-4 stroke-[3px]" />
                            ) : (
                                <span className="text-[10px] font-black">{step.id}</span>
                            )}
                        </div>
                        <span
                            className={cn(
                                "text-[8px] font-black uppercase tracking-widest text-center",
                                currentStep === step.id || step.completed
                                    ? "text-black"
                                    : "text-black/20"
                            )}
                        >
                            {step.label}
                        </span>
                    </div>

                    {index < steps.length - 1 && (
                        <div
                            className={cn(
                                "h-[2px] flex-1 mb-4 transition-colors duration-500",
                                step.completed ? "bg-black" : "bg-black/5"
                            )}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
