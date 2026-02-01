'use client';

import { useState, useEffect } from 'react';
import { ContextTemplate, contextTemplateService } from '@/lib/api';
import { Check, ChevronsUpDown, GripVertical, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface TemplateSelectorProps {
    repositoryId: string;
    selectedTemplateIds: string[];
    onChange: (templateIds: string[]) => void;
}

export function TemplateSelector({ selectedTemplateIds, onChange }: TemplateSelectorProps) {
    const [allTemplates, setAllTemplates] = useState<ContextTemplate[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTemplates = async () => {
            setLoading(true);
            try {
                const data = await contextTemplateService.getAll(1, 100);
                setAllTemplates(data.templates);
            } catch (error) {
                console.error('Failed to fetch templates:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTemplates();
    }, []);

    const toggleTemplate = (id: string) => {
        if (selectedTemplateIds.includes(id)) {
            onChange(selectedTemplateIds.filter((tId) => tId !== id));
        } else {
            onChange([...selectedTemplateIds, id]);
        }
    };

    const reorder = (index: number, direction: 'up' | 'down') => {
        const newIds = [...selectedTemplateIds];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= newIds.length) return;

        [newIds[index], newIds[newIndex]] = [newIds[newIndex], newIds[index]];
        onChange(newIds);
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border-2 border-dashed border-black/10 rounded-none bg-white/50">
                {selectedTemplateIds.length === 0 ? (
                    <span className="text-[10px] font-bold text-black/30 uppercase tracking-widest p-2">
                        No templates selected
                    </span>
                ) : (
                    <div className="flex flex-col w-full gap-2">
                        {selectedTemplateIds.map((id, index) => {
                            const template = allTemplates.find((t) => t.id === id);
                            if (!template) return null;
                            return (
                                <div
                                    key={id}
                                    className="flex items-center gap-3 p-3 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] animate-in slide-in-from-left-2 duration-200"
                                >
                                    <div className="flex flex-col gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-4 w-4 hover:bg-black hover:text-white rounded-none p-0"
                                            onClick={() => reorder(index, 'up')}
                                            disabled={index === 0}
                                        >
                                            <ChevronsUpDown className="h-3 w-3 rotate-180" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-4 w-4 hover:bg-black hover:text-white rounded-none p-0"
                                            onClick={() => reorder(index, 'down')}
                                            disabled={index === selectedTemplateIds.length - 1}
                                        >
                                            <ChevronsUpDown className="h-3 w-3" />
                                        </Button>
                                    </div>
                                    <div className="flex-grow">
                                        <div className="text-[10px] font-black uppercase tracking-tight">{template.name}</div>
                                        <div className="text-[8px] font-medium text-black/40 uppercase tracking-widest">
                                            Priority {index + 1}
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="rounded-none text-[8px] font-black border-black/10">
                                        {template.is_default ? 'SYSTEM' : 'CUSTOM'}
                                    </Badge>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 hover:bg-destructive hover:text-destructive-foreground rounded-none"
                                        onClick={() => toggleTemplate(id)}
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-full h-12 rounded-none border-2 border-black bg-white hover:bg-black hover:text-white transition-all font-black uppercase tracking-tight text-[10px] gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
                    >
                        <Plus className="h-4 w-4" />
                        Add Context Template
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[300px] max-h-[400px] overflow-y-auto rounded-none border-2 border-black p-0 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <div className="p-2 bg-black text-white text-[10px] font-black uppercase tracking-widest">Available Templates</div>
                    {allTemplates.length === 0 ? (
                        <div className="p-4 text-center text-[10px] font-bold text-black/40 uppercase">Loading templates...</div>
                    ) : (
                        allTemplates.map((template) => {
                            const isSelected = selectedTemplateIds.includes(template.id);
                            return (
                                <DropdownMenuItem
                                    key={template.id}
                                    className={cn(
                                        "flex items-center justify-between p-3 rounded-none cursor-pointer border-b border-black/5 hover:bg-primary/5 focus:bg-primary/10",
                                        isSelected && "bg-primary/5"
                                    )}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleTemplate(template.id);
                                    }}
                                >
                                    <div className="flex flex-col gap-1">
                                        <div className="font-black text-[10px] uppercase tracking-tight">{template.name}</div>
                                        <div className="text-[8px] font-medium text-black/40 uppercase tracking-widest line-clamp-1">
                                            {template.description || 'No description'}
                                        </div>
                                    </div>
                                    {isSelected && <Check className="h-4 w-4 text-primary" />}
                                </DropdownMenuItem>
                            );
                        })
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
