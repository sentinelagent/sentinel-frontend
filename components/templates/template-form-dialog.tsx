'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Info } from 'lucide-react';
import { ContextTemplate, ContextTemplateCreate } from '@/lib/api';

const formSchema = z.object({
    name: z.string().min(1, 'Name is required').max(255),
    description: z.string().optional(),
    visibility: z.enum(['private', 'organization', 'public']),
    template_content: z.object({
        guidelines: z.array(z.string()).default([]),
        focus_areas: z.array(z.string()).default([]),
        additional_context: z.string().optional(),
    }),
});

type FormValues = z.infer<typeof formSchema>;

interface TemplateFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    template?: ContextTemplate; // If provided, edit mode
    onSubmit: (data: ContextTemplateCreate) => Promise<void>;
}

const FOCUS_AREAS = [
    { label: 'Security', value: 'security' },
    { label: 'Performance', value: 'performance' },
    { label: 'Code Quality', value: 'code_quality' },
    { label: 'Error Handling', value: 'error_handling' },
    { label: 'Documentation', value: 'documentation' },
    { label: 'Testing', value: 'testing' },
    { label: 'Maintainability', value: 'maintainability' },
];

export function TemplateFormDialog({ open, onOpenChange, template, onSubmit }: TemplateFormDialogProps) {
    const [newGuideline, setNewGuideline] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
            visibility: 'private',
            template_content: {
                guidelines: [],
                focus_areas: [],
                additional_context: '',
            },
        },
    });

    useEffect(() => {
        if (template) {
            form.reset({
                name: template.name,
                description: template.description || '',
                visibility: template.visibility,
                template_content: {
                    guidelines: template.template_content.guidelines || [],
                    focus_areas: template.template_content.focus_areas || [],
                    additional_context: template.template_content.additional_context || '',
                },
            });
        } else {
            form.reset({
                name: '',
                description: '',
                visibility: 'private',
                template_content: {
                    guidelines: [],
                    focus_areas: [],
                    additional_context: '',
                },
            });
        }
    }, [template, form, open]);

    const handleFormSubmit = async (values: FormValues) => {
        setIsSubmitting(true);
        try {
            await onSubmit(values as ContextTemplateCreate);
            onOpenChange(false);
        } catch (error) {
            console.error('Failed to submit template:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const addGuideline = () => {
        if (!newGuideline.trim()) return;
        const currentGuidelines = form.getValues('template_content.guidelines');
        form.setValue('template_content.guidelines', [...currentGuidelines, newGuideline.trim()]);
        setNewGuideline('');
    };

    const removeGuideline = (index: number) => {
        const currentGuidelines = form.getValues('template_content.guidelines');
        form.setValue('template_content.guidelines', currentGuidelines.filter((_, i) => i !== index));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-md border-white/20">
                <DialogHeader>
                    <DialogTitle>{template ? 'Edit Template' : 'Create Context Template'}</DialogTitle>
                    <DialogDescription>
                        Define reusable review guidelines and focus areas to steer AI code reviews.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6 pt-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel>Template Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Clean Architecture" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }: { field: any }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="What are these guidelines for?" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="space-y-4 rounded-lg border border-primary/10 bg-primary/5 p-4">
                            <h3 className="text-sm font-semibold flex items-center gap-2">
                                <Info className="w-4 h-4 text-primary" />
                                Template Content
                            </h3>

                            <FormField
                                control={form.control}
                                name="template_content.focus_areas"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>Focus Areas</FormLabel>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {FOCUS_AREAS.map((area) => {
                                                const isSelected = field.value.includes(area.value);
                                                return (
                                                    <Badge
                                                        key={area.value}
                                                        variant={isSelected ? 'default' : 'outline'}
                                                        className="cursor-pointer transition-all"
                                                        onClick={() => {
                                                            const newValue = isSelected
                                                                ? field.value.filter((val: string) => val !== area.value)
                                                                : [...field.value, area.value];
                                                            field.onChange(newValue);
                                                        }}
                                                    >
                                                        {area.label}
                                                    </Badge>
                                                );
                                            })}
                                        </div>
                                        <FormDescription>Select the main aspects the AI should prioritize.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormItem>
                                <FormLabel>Review Guidelines</FormLabel>
                                <div className="space-y-3">
                                    <div className="flex gap-2">
                                        <Input
                                            value={newGuideline}
                                            onChange={(e) => setNewGuideline(e.target.value)}
                                            placeholder="e.g., Avoid unnecessary allocations in loops"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    addGuideline();
                                                }
                                            }}
                                        />
                                        <Button type="button" size="sm" onClick={addGuideline}>
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto">
                                        {form.watch('template_content.guidelines').map((guideline: string, index: number) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between p-2 rounded bg-white border border-slate-200 group animate-in slide-in-from-left-2 duration-200"
                                            >
                                                <span className="text-sm">{guideline}</span>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 text-muted-foreground hover:text-destructive"
                                                    onClick={() => removeGuideline(index)}
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <FormDescription>Specific rules for the AI to check during reviews.</FormDescription>
                            </FormItem>

                            <FormField
                                control={form.control}
                                name="template_content.additional_context"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>Additional Context</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Any other specific instructions or context..."
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter>
                            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Saving...' : template ? 'Save Changes' : 'Create Template'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
