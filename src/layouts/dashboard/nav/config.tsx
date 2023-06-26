// routes
// components
import { PATH_PAGE } from 'src/routes/paths'
import SvgColor from '../../../components/svg-color'

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />

const ICONS = {
    blog: icon('ic_blog'),
    cart: icon('ic_cart'),
    chat: icon('ic_chat'),
    mail: icon('ic_mail'),
    user: icon('ic_user'),
    file: icon('ic_file'),
    lock: icon('ic_lock'),
    label: icon('ic_label'),
    blank: icon('ic_blank'),
    kanban: icon('ic_kanban'),
    folder: icon('ic_folder'),
    banking: icon('ic_banking'),
    booking: icon('ic_booking'),
    invoice: icon('ic_invoice'),
    calendar: icon('ic_calendar'),
    disabled: icon('ic_disabled'),
    external: icon('ic_external'),
    menuItem: icon('ic_menu_item'),
    ecommerce: icon('ic_ecommerce'),
    analytics: icon('ic_analytics'),
    dashboard: icon('ic_dashboard'),
}

const navConfig = [
    // GENERAL
    // ----------------------------------------------------------------------
    {
        subheader: 'Menu',
        items: [
            { title: 'Relatórios', path: PATH_PAGE.reports, icon: ICONS.kanban },
            { title: 'Relatos', path: PATH_PAGE.narratives, icon: ICONS.kanban },
            { title: 'Minhas empresas', path: PATH_PAGE.companies, icon: ICONS.dashboard },
            { title: 'Usuários', path: PATH_PAGE.users, icon: ICONS.user },
            // { title: 'Entregadores', path: PATH_PAGE.deliverymans, icon: ICONS.ecommerce },
            // { title: 'Pedidos', path: PATH_PAGE.orders, icon: ICONS.ecommerce },
        ],
    },
]

export default navConfig
