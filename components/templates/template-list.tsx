'use client';

import { useState, useEffect } from 'react';
import { contextTemplateService, ContextTemplate, ContextTemplateCreate } from '@/lib/api';
import { TemplateCard } from './template-card';
import { TemplateFormDialog } from './template-form-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export function TemplateList() {
    const [templates, setTemplates] = useState<ContextTemplate[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<ContextTemplate | undefined>();

    const fetchTemplates = async () => {
        setLoading(true);
        try {
            const data = await contextTemplateService.getAll(1, 100);
            setTemplates(data.templates);
        } catch (error) {
            console.error('Failed to fetch templates:', error);
            toast.error('Failed to load templates. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTemplates();
    }, []);

    const handleCreateTemplate = async (data: ContextTemplateCreate) => {
        try {
            await contextTemplateService.create(data);
            toast.success('Template created successfully!');
            fetchTemplates();
        } catch (error) {
            console.error('Failed to create template:', error);
            toast.error('Failed to create template.');
            throw error;
        }
    };

    const handleUpdateTemplate = async (data: ContextTemplateCreate) => {
        if (!selectedTemplate) return;
        try {
            await contextTemplateService.update(selectedTemplate.id, data);
            toast.success('Template updated successfully!');
            fetchTemplates();
        } catch (error) {
            console.error('Failed to update template:', error);
            toast.error('Failed to update template.');
            throw error;
        }
    };

    const handleDeleteTemplate = async (template: ContextTemplate) => {
        if (!confirm(`Are you sure you want to delete "${template.name}"?`)) return;
        try {
            await contextTemplateService.delete(template.id);
            toast.success('Template deleted successfully!');
            fetchTemplates();
        } catch (error) {
            console.error('Failed to delete template:', error);
            toast.error('Failed to delete template.');
        }
    };

    const filteredTemplates = templates.filter((t) => {
        const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (t.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

        if (activeTab === 'all') return matchesSearch;
        if (activeTab === 'mine') return matchesSearch && !t.is_default;
        if (activeTab === 'default') return matchesSearch && t.is_default;
        return matchesSearch;
    });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-primary/10 pb-6">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                        Context Templates
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Manage reusable review guidelines and coding standards.
                    </p>
                </div>
                <Button
                    onClick={() => {
                        setSelectedTemplate(undefined);
                        setIsDialogOpen(true);
                    }}
                    className="shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-primary-foreground group"
                >
                    <Plus className="mr-2 h-5 w-5 transition-transform group-hover:rotate-90" />
                    New Template
                </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/40 p-2 rounded-2xl border border-white/20 backdrop-blur-sm shadow-sm">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
                    <TabsList className="bg-transparent">
                        <TabsTrigger value="all" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">All</TabsTrigger>
                        <TabsTrigger value="mine" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">My Templates</TabsTrigger>
                        <TabsTrigger value="default" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">System Defaults</TabsTrigger>
                    </TabsList>
                </Tabs>
                <div className="relative w-full sm:w-72 group">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                    <Input
                        placeholder="Search templates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-10 rounded-xl border-white/40 bg-white/60 focus:bg-white transition-all shadow-none focus:ring-2 focus:ring-primary/20"
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary/40" />
                    <p className="text-muted-foreground font-medium animate-pulse">Loading your knowledge base...</p>
                </div>
            ) : filteredTemplates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTemplates.map((template) => (
                        <TemplateCard
                            key={template.id}
                            template={template}
                            onEdit={(t) => {
                                setSelectedTemplate(t);
                                setIsDialogOpen(true);
                            }}
                            onDelete={handleDeleteTemplate}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 px-4 text-center rounded-3xl border-2 border-dashed border-primary/10 bg-primary/5">
                    <div className="bg-primary/10 p-6 rounded-full mb-6">
                        {searchQuery ? <Search className="h-12 w-12 text-primary/40" /> : <Sparkles className="h-12 w-12 text-primary/40" />}
                    </div>
                    <h3 className="text-2xl font-bold text-primary/80 mb-2">
                        {searchQuery ? 'No templates match your search' : 'Ready to build your context?'}
                    </h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-8 text-lg">
                        {searchQuery
                            ? "Try adjusting your search filters or clear the search to see all templates."
                            : "Create your first template to define custom review focus areas and guidelines for your repositories."}
                    </p>
                    {!searchQuery && (
                        <Button
                            onClick={() => {
                                setSelectedTemplate(undefined);
                                setIsDialogOpen(true);
                            }}
                            variant="outline"
                            className="bg-white hover:bg-white/80 border-primary/20 text-primary"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Create Template
                        </Button>
                    )}
                </div>
            )}

            <TemplateFormDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                template={selectedTemplate}
                onSubmit={selectedTemplate ? handleUpdateTemplate : handleCreateTemplate}
            />
        </div>
    );
}
