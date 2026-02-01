'use client';

import { ContextTemplate } from '@/lib/api';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, Globe, Lock, Shield, Zap, Layout } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface TemplateCardProps {
    template: ContextTemplate;
    onEdit?: (template: ContextTemplate) => void;
    onDelete?: (template: ContextTemplate) => void;
}

export function TemplateCard({ template, onEdit, onDelete }: TemplateCardProps) {
    const isDefault = template.is_default;
    const updatedAt = new Date(template.updated_at);

    const getIcon = (name: string) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('security')) return <Shield className="w-4 h-4" />;
        if (lowerName.includes('performance') || lowerName.includes('optimized')) return <Zap className="w-4 h-4" />;
        if (lowerName.includes('architecture')) return <Layout className="w-4 h-4" />;
        return <Globe className="w-4 h-4" />;
    };

    return (
        <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white/50 backdrop-blur-sm border-white/20">
            <CardHeader>
                <div className="flex justify-between items-start gap-2">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            {getIcon(template.name)}
                        </div>
                        <CardTitle className="text-xl font-bold leading-tight line-clamp-1">
                            {template.name}
                        </CardTitle>
                    </div>
                    <Badge variant={template.visibility === 'public' ? 'default' : 'secondary'} className="capitalize">
                        {template.visibility === 'public' ? <Globe className="w-3 h-3 mr-1" /> : <Lock className="w-3 h-3 mr-1" />}
                        {template.visibility}
                    </Badge>
                </div>
                <CardDescription className="line-clamp-2 mt-2 min-h-[40px]">
                    {template.description || 'No description provided.'}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                    {template.template_content.focus_areas?.map((area) => (
                        <Badge key={area} variant="outline" className="bg-primary/5 text-primary border-primary/20">
                            {area.replace('_', ' ')}
                        </Badge>
                    ))}
                    {template.template_content.guidelines && template.template_content.guidelines.length > 0 && (
                        <Badge variant="outline" className="bg-muted text-muted-foreground border-muted-foreground/20">
                            {template.template_content.guidelines.length} Guidelines
                        </Badge>
                    )}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center border-t border-white/10 pt-4">
                <span className="text-xs text-muted-foreground">
                    Updated {formatDistanceToNow(updatedAt)} ago
                </span>
                <div className="flex gap-2">
                    {!isDefault && onEdit && (
                        <Button variant="ghost" size="icon" onClick={() => onEdit(template)} className="hover:bg-primary/10 hover:text-primary">
                            <Edit2 className="w-4 h-4" />
                        </Button>
                    )}
                    {!isDefault && onDelete && (
                        <Button variant="ghost" size="icon" onClick={() => onDelete(template)} className="hover:bg-destructive/10 hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}
