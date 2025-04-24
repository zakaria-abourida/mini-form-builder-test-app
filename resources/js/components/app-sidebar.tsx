import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import i18n from '@/i18n';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { t } from 'i18next';
import { LayoutGrid } from 'lucide-react';
import { useState } from 'react';

const mainNavItems: NavItem[] = [
    {
        title: 'Forms',
        href: '/dashboard',
        icon: LayoutGrid,
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    const [language, setLanguage] = useState(i18n.language || 'en');

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLang = event.target.value;
        i18n.changeLanguage(selectedLang);
        setLanguage(selectedLang);
    };

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />

                <div className="mt-4 px-3">
                    <label htmlFor="language" className="text-muted-foreground mb-1 block text-sm">
                        {t('language')}
                    </label>
                    <select id="language" value={language} onChange={handleLanguageChange} className="w-full rounded-md border px-2 py-1 text-sm">
                        <option value="en">{t('english')}</option>
                        <option value="de">{t('german')}</option>
                    </select>
                </div>

                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
