// ---------------------------------------------------------------------------
// GearBOX / Platform Customizer - HighLevel Updated Agency JS
// Updated for newer HighLevel sidebar routing + dynamic DOM changes
// ---------------------------------------------------------------------------

(function () {
    'use strict';

    if (window.__GEARBOX_PLATFORM_CUSTOMIZER_V2_LOADED__) {
        console.warn('[GearBOX Customizer] Already loaded. Skipping duplicate init.');
        return;
    }

    window.__GEARBOX_PLATFORM_CUSTOMIZER_V2_LOADED__ = true;

    // =====================================================================
    // CONFIG
    // =====================================================================
    const WORKER_URL = 'https://platformcustomizer.mymessagingapp.com/api.php';

    const ENABLE_LOGO_CUSTOMIZATION = true;
    const ENABLE_APPEARANCE_CONTROLS = true;
    const DEBUG = true;

    const buttonId = 'gearbox-sidebar-customizer-button';
    const popupId = 'gearbox-sidebar-customizer-popup';

    const storageKey = 'customSidebarSettings';
    const buttonStorageKey = 'customButtonStyleSettings';
    const iconStorageKey = 'sidebarIconStyleSettings';
    const renameStorageKey = 'sidebarRenameSettings';
    const logoStorageKey = 'agencyLogoUrl';
    const logoHeightStorageKey = 'agencyLogoHeight';
    const appearanceStorageKey = 'sidebarAppearanceSettings';
    const dynamicStyleId = 'gearbox-sidebar-dynamic-styles';
    const baseStyleId = 'gearbox-sidebar-base-styles';

    const iconBaseUrl = 'https://platformcustomizer.mymessagingapp.com/static/';

    const log = (...args) => {
        if (DEBUG) console.log('[GearBOX Customizer]', ...args);
    };

    // =====================================================================
    // NAV CONFIG
    // =====================================================================

    const MAIN_NAV_COMPONENTS = [
        { id: 'sb_launchpad', name: 'Launchpad' },
        { id: 'sb_dashboard', name: 'Dashboard' },
        { id: 'sb_conversations', name: 'Conversations' },
        { id: 'sb_calendars', name: 'Calendars' },
        { id: 'sb_contacts', name: 'Contacts' },
        { id: 'sb_opportunities', name: 'Opportunities' },
        { id: 'sb_payments', name: 'Payments' },

        // Newer HighLevel ID
        { id: 'sb_ai-agents', name: 'AI Agents' },

        // Backward compatibility only
        { id: 'sb_AI Agents', name: 'AI Agents' },

        { id: 'sb_email-marketing', name: 'Marketing' },
        { id: 'sb_automation', name: 'Automation' },
        { id: 'sb_sites', name: 'Sites' },
        { id: 'sb_memberships', name: 'Memberships' },
        { id: 'sb_app-media', name: 'Media Storage' },
        { id: 'sb_reputation', name: 'Reputation' },
        { id: 'sb_reporting', name: 'Reporting' },
        { id: 'sb_app-marketplace', name: 'App Marketplace' },
        { id: 'sb_marketplace', name: 'Marketplace' },
        { id: 'sb_settings', name: 'Settings' }
    ];

    const CUSTOM_DIVIDERS = [
        { id: 'custom-divider-1', name: 'Divider 1' },
        { id: 'custom-divider-2', name: 'Divider 2' },
        { id: 'custom-divider-3', name: 'Divider 3' }
    ];

    const iconList = [
        '3dicons-bag-front-color.png',
        '3dicons-bell-front-color.png',
        '3dicons-blender-front-color.png',
        '3dicons-boy-front-color.png',
        '3dicons-brush-front-color.png',
        '3dicons-bulb-front-color.png',
        '3dicons-calculator-front-color.png',
        '3dicons-calender-front-color.png',
        '3dicons-camera-front-color.png',
        '3dicons-chart-front-color.png',
        '3dicons-chat-bubble-front-color.png',
        '3dicons-clock-front-color.png',
        '3dicons-computer-front-color.png',
        '3dicons-credit-card-front-color.png',
        '3dicons-dollar-front-color.png',
        '3dicons-explorer-front-color.png',
        '3dicons-file-front-color.png',
        '3dicons-fire-front-color.png',
        '3dicons-flash-front-color.png',
        '3dicons-gift-front-color.png',
        '3dicons-key-front-color.png',
        '3dicons-link-front-color.png',
        '3dicons-lock-front-color.png',
        '3dicons-mail-front-color.png',
        '3dicons-map-pin-front-color.png',
        '3dicons-megaphone-front-color.png',
        '3dicons-minecraft-front-color.png',
        '3dicons-money-front-color.png',
        '3dicons-phone-front-color.png',
        '3dicons-plus-front-color.png',
        '3dicons-puzzle-front-color.png',
        '3dicons-rocket-front-color.png',
        '3dicons-search-front-color.png',
        '3dicons-setting-front-color.png',
        '3dicons-shield-front-color.png',
        '3dicons-shop-front-color.png',
        '3dicons-sphere-front-color.png',
        '3dicons-star-front-color.png',
        '3dicons-trash-front-color.png',
        '3dicons-user-front-color.png',
        '3dicons-video-cam-front-color.png',
        '3dicons-world-front-color.png'
    ];

    const standardIconSettings = {
        'sb_launchpad': '3dicons-flash-front-color.png',
        'sb_dashboard': '3dicons-dollar-front-color.png',
        'sb_conversations': '3dicons-chat-bubble-front-color.png',
        'sb_calendars': '3dicons-calender-front-color.png',
        'sb_contacts': '3dicons-boy-front-color.png',
        'sb_opportunities': '3dicons-money-front-color.png',
        'sb_payments': '3dicons-credit-card-front-color.png',
        'sb_ai-agents': '3dicons-minecraft-front-color.png',
        'sb_AI Agents': '3dicons-minecraft-front-color.png',
        'sb_email-marketing': '3dicons-megaphone-front-color.png',
        'sb_automation': '3dicons-blender-front-color.png',
        'sb_sites': '3dicons-sphere-front-color.png',
        'sb_memberships': '3dicons-shield-front-color.png',
        'sb_app-media': '3dicons-video-cam-front-color.png',
        'sb_reputation': '3dicons-star-front-color.png',
        'sb_reporting': '3dicons-chart-front-color.png',
        'sb_app-marketplace': '3dicons-plus-front-color.png',
        'sb_marketplace': '3dicons-plus-front-color.png',
        'sb_settings': '3dicons-setting-front-color.png'
    };

    const subMenuConfig = {
        'sb_conversations': [
            { text: 'Conversations', href: '/conversations/conversations' },
            { text: 'Manual Actions', clickId: 'tb_manual-actions' },
            { text: 'Snippets', clickId: 'tb_conversations-templates' },
            { text: 'Trigger Links', clickId: 'tb_trigger-links' }
        ],
        'sb_calendars': [
            { text: 'Calendar View', clickId: 'tb_calendars-tab' },
            { text: 'Appointments List', clickId: 'tb_appointment-tab' },
            { text: 'Calendar Settings', clickId: 'tb_calendar-settings-top' }
        ],
        'sb_contacts': [
            { text: 'Smart Lists', clickId: 'tb_lists' },
            { text: 'Bulk Actions', clickId: 'tb_bulk-actions' },
            { text: 'Restore', clickId: 'tb_contacts-restore' },
            { text: 'Tasks', clickId: 'tb_tasks' },
            { text: 'Businesses', clickId: 'tb_business' },
            { text: 'Manage Smart Lists', clickId: 'tb_contacts-settings-top' }
        ],
        'sb_opportunities': [
            { text: 'Opportunities', clickId: 'tb_opportunities-tab' },
            { text: 'Pipelines', clickId: 'tb_pipeline' },
            { text: 'Bulk Actions', clickId: 'tb_bulk-actions' }
        ],
        'sb_payments': [
            { text: 'Invoices & Estimates', clickId: 'tb_payment-invoices' },
            { text: 'Documents & Contracts', clickId: 'tb_proposals-estimates' },
            { text: 'Orders', clickId: 'tb_payment-orders-new' },
            { text: 'Subscriptions', clickId: 'tb_payment-subscriptions' },
            { text: 'Payment Links', clickId: 'tb_payment-links' },
            { text: 'Transactions', clickId: 'tb_payment-transactions-new' },
            { text: 'Products', clickId: 'tb_payments-products' },
            { text: 'Coupons', clickId: 'tb_payments-coupons' },
            { text: 'Settings', clickId: 'tb_payment-settings' },
            { text: 'Integrations', clickId: 'tb_payment-integrations' }
        ],
        'sb_ai-agents': [
            { text: 'AI Agents', clickId: 'tb_ai-agents-getting-started' },
            { text: 'Voice AI', clickId: 'tb_ai-agents-voice-ai' },
            { text: 'Conversation AI', clickId: 'tb_ai-agents-conversation-ai' },
            { text: 'Knowledgebase', clickId: 'tb_ai-agents-knowledge-base' },
            { text: 'Content AI', clickId: 'tb_ai-agents-content-ai' }
        ],
        'sb_AI Agents': [
            { text: 'AI Agents', clickId: 'tb_ai-agents-getting-started' },
            { text: 'Voice AI', clickId: 'tb_ai-agents-voice-ai' },
            { text: 'Conversation AI', clickId: 'tb_ai-agents-conversation-ai' },
            { text: 'Knowledgebase', clickId: 'tb_ai-agents-knowledge-base' },
            { text: 'Content AI', clickId: 'tb_ai-agents-content-ai' }
        ],
        'sb_email-marketing': [
            { text: 'Social Planner', clickId: 'tb_social-planner' },
            { text: 'Email Stats', clickId: 'tb_email-builder' },
            { text: 'Snippets', clickId: 'tb_email-templates' },
            { text: 'Countdown Timers', clickId: 'tb_countdown-timer' },
            { text: 'Trigger Links', clickId: 'tb_trigger-links' },
            { text: 'Affiliate Manager', clickId: 'tb_affiliate-manager' },
            { text: 'Brand Boards', clickId: 'tb_brand-boards' },
            { text: 'Ad Manager', clickId: 'tb_ad-manager-home' }
        ],
        'sb_automation': [
            { text: 'Workflows', clickId: 'tb_workflow' },
            { text: 'Settings', clickId: 'tb_workflow-settings-top' }
        ],
        'sb_sites': [
            { text: 'Funnels', clickId: 'tb_funnels' },
            { text: 'Websites', clickId: 'tb_websites' },
            { text: 'Stores', clickId: 'tb_stores' },
            { text: 'Webinars', clickId: 'tb_webinars' },
            { text: 'Analytics', clickId: 'tb_analytics' },
            { text: 'Blogs', clickId: 'tb_blogs' },
            { text: 'WordPress', clickId: 'tb_wordpress-v2' },
            { text: 'Client Portal', clickId: 'tb_clientportal' },
            { text: 'Forms', clickId: 'tb_form-builder' },
            { text: 'Surveys', clickId: 'tb_survey-builder' },
            { text: 'Quizzes', clickId: 'tb_quizz-builder' },
            { text: 'Chat Widget', clickId: 'tb_chat-widget' },
            { text: 'QR Codes', clickId: 'tb_qr-codes' },
            { text: 'Domains', clickId: 'tb_sites-domain-settings' }
        ],
        'sb_memberships': [
            { text: 'Client Portal', clickId: 'tb_clientportalCommunities' },
            { text: 'Courses', clickId: 'tb_courses' },
            { text: 'Communities', clickId: 'tb_communities' },
            { text: 'Credentials', clickId: 'tb_certificates' },
            { text: 'GoKollab Marketplace', clickId: 'tb_gokollab' }
        ],
        'sb_reputation': [
            { text: 'Overview', clickId: 'tb_reputation-overview' },
            { text: 'Requests', clickId: 'tb_reputations-requests' },
            { text: 'Reviews', clickId: 'tb_reputations-reviews' },
            { text: 'Widgets', clickId: 'tb_reputation-widgets' },
            { text: 'Listings', clickId: 'tb_online-listings' },
            { text: 'Settings', clickId: 'tb_reputation-settings' }
        ],
        'sb_reporting': [
            { text: 'Overview', clickId: 'tb_custom-reports' },
            { text: 'Google Ads', clickId: 'tb_google-ads' },
            { text: 'Facebook Ads', clickId: 'tb_facebook-ads' },
            { text: 'Attribution Report', clickId: 'tb_attribution-v2' },
            { text: 'Call Report', clickId: 'tb_call-reporting' },
            { text: 'Agent Report', clickId: 'tb_agent-reporting' },
            { text: 'Appointment Report', clickId: 'tb_appointment-report' },
            { text: 'Audit Report', clickId: 'tb_audit-report' }
        ]
    };

    // =====================================================================
    // STATE
    // =====================================================================

    let currentIconSettings = {};
    let currentRenameSettings = {};
    let currentAppearanceSettings = {};
    let latestSidebarSettings = null;
    let initialSetupDone = false;
    let isDragging = false;
    let isDraggingButton = false;
    let draggedItem = null;
    let debounceTimer = null;
    let openSubMenu = { parent: null, element: null };
    let closeSubMenuTimer = null;
    let lastRunPath = window.location.pathname;

    // =====================================================================
    // SAFE UTILITIES
    // =====================================================================

    function escapeHtml(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function safeJsonParse(value, fallback) {
        try {
            if (!value) return fallback;
            if (typeof value === 'object') return value;
            return JSON.parse(value);
        } catch (e) {
            console.warn('[GearBOX Customizer] JSON parse failed:', e);
            return fallback;
        }
    }

    function getContextLocationId() {
        try {
            const objectLocationId = window.gohighlevel?.location?.id;
            if (objectLocationId) {
                localStorage.setItem('lastGhlLocationId_PlatformCustomizer', objectLocationId);
                return objectLocationId;
            }
        } catch (e) {}

        const path = window.location.pathname || '';
        const match = path.match(/\/(?:v2\/)?location\/([^/?#]+)/);

        if (match && match[1]) {
            const locationId = decodeURIComponent(match[1]);
            if (locationId && locationId.length > 5) {
                localStorage.setItem('lastGhlLocationId_PlatformCustomizer', locationId);
                return locationId;
            }
        }

        const stored = localStorage.getItem('lastGhlLocationId_PlatformCustomizer');
        if (stored) return stored;

        return null;
    }

    function isLocationView() {
        return /\/(?:v2\/)?location\//.test(window.location.pathname || '');
    }

    function isSettingsView() {
        return !!document.querySelector('.hl_nav-header-without-footer');
    }

    function getLocationBasePath() {
        const match = (window.location.pathname || '').match(/(\/(?:v2\/)?location\/[^/?#]+)/);
        return match ? match[1] : '';
    }

    function getSidebar() {
        return document.getElementById('sidebar-v2') || document.querySelector('.lead-connector');
    }

    function getNavContainer() {
        return document.querySelector(
            '#sidebar-v2 .hl_nav-header > nav, ' +
            '#sidebar-v2 .hl_nav-header-without-footer > nav, ' +
            '.lead-connector .hl_nav-header > nav, ' +
            '.lead-connector .hl_nav-header-without-footer > nav'
        );
    }

    function getNavLinks() {
        return Array.from(document.querySelectorAll(
            '#sidebar-v2 .hl_nav-header > nav > a[id], ' +
            '.lead-connector .hl_nav-header > nav > a[id]'
        ));
    }

    function closeAllPopups() {
        document.querySelectorAll(
            '.gearbox-modal-overlay,' +
            '.gearbox-popup-overlay,' +
            '.gearbox-slide-popup,' +
            '.gearbox-settings-overlay,' +
            '.gearbox-icon-picker-overlay,' +
            '.sub-menu-container'
        ).forEach(el => el.remove());

        openSubMenu = { parent: null, element: null };
    }

    function processHref(href) {
        if (!href || typeof href !== 'string') return '#';
        if (href.startsWith('http')) return href;

        if (href.startsWith('/')) {
            const basePath = getLocationBasePath();
            return basePath ? `${basePath}${href}` : href;
        }

        return href;
    }

    function waitForElementAndClick(elementId, maxRetries = 50, interval = 120) {
        let tries = 0;

        const timer = setInterval(() => {
            const el = document.getElementById(elementId);
            if (el) {
                el.click();
                clearInterval(timer);
                return;
            }

            tries++;
            if (tries >= maxRetries) {
                clearInterval(timer);
                console.warn('[GearBOX Customizer] Could not find click target:', elementId);
            }
        }, interval);
    }

    // =====================================================================
    // BACKEND HELPER
    // =====================================================================

    const supabaseHelper = {
        async get(key) {
            const locationId = getContextLocationId();
            if (!locationId) return null;

            try {
                const res = await fetch(`${WORKER_URL}/api/get-sidebar-setting?location_id=${encodeURIComponent(locationId)}&key=${encodeURIComponent(key)}`);
                const result = await res.json();
                return result.status === 'success' ? result.data : null;
            } catch (e) {
                console.error(`[GearBOX Customizer] Error fetching ${key}:`, e);
                return null;
            }
        },

        async set(key, value) {
            const locationId = getContextLocationId();
            if (!locationId) return;

            try {
                await fetch(`${WORKER_URL}/api/set-sidebar-setting`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ location_id: locationId, key, value })
                });
            } catch (e) {
                console.error(`[GearBOX Customizer] Error saving ${key}:`, e);
            }
        },

        async remove(key) {
            const locationId = getContextLocationId();
            if (!locationId) return;

            try {
                await fetch(`${WORKER_URL}/api/remove-sidebar-setting`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ location_id: locationId, key })
                });
            } catch (e) {
                console.error(`[GearBOX Customizer] Error removing ${key}:`, e);
            }
        }
    };

    // =====================================================================
    // STYLES
    // =====================================================================

    function injectBaseStyles() {
        if (document.getElementById(baseStyleId)) return;

        const style = document.createElement('style');
        style.id = baseStyleId;
        style.textContent = `
            body.gearbox-sidebar-active #sidebar-v2 a[id].hide-before-pseudo::before,
            body.gearbox-sidebar-active .lead-connector a[id].hide-before-pseudo::before {
                content: none !important;
                display: none !important;
            }

            body.gearbox-icons-stacked #sidebar-v2 .hl_nav-header nav a[id],
            body.gearbox-icons-stacked .lead-connector .hl_nav-header nav a[id] {
                flex-direction: column !important;
                align-items: center !important;
                justify-content: center !important;
                padding-top: 8px !important;
                padding-bottom: 8px !important;
                min-height: 58px !important;
            }

            body.gearbox-icons-stacked #sidebar-v2 .nav-title,
            body.gearbox-icons-stacked .lead-connector .nav-title {
                margin-top: 2px !important;
                font-size: 10px !important;
                line-height: 1.2 !important;
                text-align: center !important;
            }

            .custom-sidebar-icon {
                object-fit: contain !important;
                flex-shrink: 0 !important;
                display: inline-block !important;
            }

            #${buttonId} {
                cursor: pointer;
            }

            #${buttonId}.dragging {
                cursor: grabbing !important;
            }

            .gearbox-popup-overlay,
            .gearbox-settings-overlay,
            .gearbox-icon-picker-overlay {
                position: fixed;
                inset: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                z-index: 2147483646;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            }

            .gearbox-slide-popup {
                position: fixed;
                top: 0;
                left: 0;
                width: 30vw;
                min-width: 420px;
                max-width: 580px;
                height: 100vh;
                background: #fff;
                box-shadow: 0 8px 30px rgba(0,0,0,0.18);
                z-index: 2147483647;
                display: flex;
                flex-direction: column;
                transform: translateX(-100%);
                transition: transform .25s ease-in-out;
                overflow: hidden;
                font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            }

            .gearbox-slide-popup.is-open {
                transform: translateX(0);
            }

            .gearbox-draggable-component {
                display: grid;
                grid-template-columns: 1fr auto;
                align-items: center;
                min-height: 44px;
                padding: 7px 12px;
                background: #f8f9fa;
                border: 1px solid #dee2e6;
                border-radius: 6px;
                cursor: grab;
                user-select: none;
                width: 100%;
                box-sizing: border-box;
                margin-bottom: 5px;
                gap: 10px;
            }

            .gearbox-draggable-component:hover {
                background: #eef2f7;
            }

            .gearbox-draggable-component.divider-component {
                display: block;
                text-align: center;
                color: #777;
                border-style: dashed;
            }

            .gearbox-component-name {
                font-weight: 600;
                color: #374151;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .gearbox-component-controls {
                display: flex;
                gap: 6px;
                align-items: center;
            }

            .gearbox-component-controls button,
            .gearbox-save-button,
            .gearbox-secondary-button {
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 13px;
                padding: 7px 10px;
            }

            .gearbox-component-controls button,
            .gearbox-secondary-button {
                background: #e5e7eb;
                color: #111827;
            }

            .gearbox-save-button {
                background: #007aff;
                color: #fff;
                font-weight: 600;
            }

            .gearbox-size-input {
                width: 52px;
                padding: 6px;
                border-radius: 6px;
                border: 1px solid #d1d5db;
                text-align: center;
            }

            .gearbox-drag-list {
                min-height: 55px;
                border: 1px dashed #cbd5e1;
                border-radius: 8px;
                padding: 7px;
                background: #fff;
            }

            .sub-menu-container {
                overflow: hidden;
                max-height: 0;
                transition: max-height .25s ease, padding .25s ease;
                padding-top: 0;
                padding-bottom: 0;
                background: rgba(0,0,0,0.04);
            }

            .sub-menu-container.is-open {
                max-height: 700px;
                padding-top: 5px;
                padding-bottom: 5px;
            }

            .sub-menu-link {
                display: block;
                padding: 7px 10px 7px 42px;
                font-size: 13px;
                color: #6b7280;
                text-decoration: none;
                cursor: pointer;
            }

            .sub-menu-link:hover {
                background: rgba(0,0,0,0.06);
            }

            .gearbox-icon-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(62px, 1fr));
                gap: 10px;
                padding: 18px;
            }

            .gearbox-icon-item {
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                padding: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                min-height: 56px;
                background: #fff;
            }

            .gearbox-icon-item:hover {
                background: #f3f4f6;
                border-color: #007aff;
            }

            .gearbox-icon-item img {
                width: 36px;
                height: 36px;
                object-fit: contain;
            }

            .gearbox-form-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 12px;
                margin-bottom: 12px;
            }

            .gearbox-form-row input[type="text"],
            .gearbox-form-row input[type="number"] {
                width: 100%;
                padding: 8px 10px;
                border: 1px solid #d1d5db;
                border-radius: 6px;
            }

            .gearbox-fieldset {
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                padding: 12px;
                margin-bottom: 12px;
            }

            .gearbox-fieldset legend {
                font-size: 13px;
                font-weight: 700;
                padding: 0 8px;
                color: #374151;
            }

            .gearbox-toggle-row {
                display: flex;
                align-items: center;
                gap: 8px;
            }
        `;

        document.head.appendChild(style);
    }

    function updateDynamicStyles(settings = currentAppearanceSettings) {
        let style = document.getElementById(dynamicStyleId);
        if (!style) {
            style = document.createElement('style');
            style.id = dynamicStyleId;
            document.head.appendChild(style);
        }

        let css = '';

        if (settings?.hoverColorEnabled && settings.hoverColor) {
            css += `
                body.gearbox-sidebar-active #sidebar-v2 nav a:hover,
                body.gearbox-sidebar-active #sidebar-v2 nav a.active,
                body.gearbox-sidebar-active .lead-connector nav a:hover,
                body.gearbox-sidebar-active .lead-connector nav a.active {
                    background: ${settings.hoverColor} !important;
                }
            `;
        }

        if (settings?.textColorEnabled && settings.textColor) {
            css += `
                body.gearbox-sidebar-active #sidebar-v2 nav a .nav-title,
                body.gearbox-sidebar-active .lead-connector nav a .nav-title {
                    color: ${settings.textColor} !important;
                }
            `;
        }

        if (settings?.textSizeEnabled && settings.textSize) {
            css += `
                body.gearbox-sidebar-active #sidebar-v2 nav a .nav-title,
                body.gearbox-sidebar-active .lead-connector nav a .nav-title {
                    font-size: ${Number(settings.textSize) || 14}px !important;
                }
            `;
        }

        if (settings?.textHoverColorEnabled && settings.textHoverColor) {
            css += `
                body.gearbox-sidebar-active #sidebar-v2 nav a:hover .nav-title,
                body.gearbox-sidebar-active #sidebar-v2 nav a.active .nav-title,
                body.gearbox-sidebar-active .lead-connector nav a:hover .nav-title,
                body.gearbox-sidebar-active .lead-connector nav a.active .nav-title {
                    color: ${settings.textHoverColor} !important;
                }
            `;
        }

        if (settings?.subMenuTextColorEnabled && settings.subMenuTextColor) {
            css += `
                body.gearbox-sidebar-active #sidebar-v2 .sub-menu-link,
                body.gearbox-sidebar-active .lead-connector .sub-menu-link {
                    color: ${settings.subMenuTextColor} !important;
                }
            `;
        }

        if (settings?.subMenuTextSizeEnabled && settings.subMenuTextSize) {
            css += `
                body.gearbox-sidebar-active #sidebar-v2 .sub-menu-link,
                body.gearbox-sidebar-active .lead-connector .sub-menu-link {
                    font-size: ${Number(settings.subMenuTextSize) || 13}px !important;
                }
            `;
        }

        style.textContent = css;
    }

    // =====================================================================
    // NAV DISCOVERY / RESTORE / APPLY
    // =====================================================================

    function discoverAndRegisterNavComponents() {
        getNavLinks().forEach(link => {
            const id = link.id;
            const name = link.querySelector('.nav-title')?.textContent?.trim() || link.textContent.trim();

            if (id && name && !MAIN_NAV_COMPONENTS.some(c => c.id === id)) {
                MAIN_NAV_COMPONENTS.push({ id, name });
                log('Discovered new nav item:', id, name);
            }
        });
    }

    function createCustomDividers() {
        const nav = getNavContainer();
        if (!nav) return;

        CUSTOM_DIVIDERS.forEach(item => {
            if (!document.getElementById(item.id)) {
                const divider = document.createElement('div');
                divider.id = item.id;
                divider.className = 'divider';
                divider.style.cssText = 'width:100%; display:flex; align-items:center; justify-content:center; padding:8px 12px; box-sizing:border-box;';
                divider.innerHTML = '<div style="width:100%; border-bottom:1px solid rgba(160,160,160,.35);"></div>';
                nav.appendChild(divider);
            }
        });
    }

    function restoreDefaultSidebar() {
        document.body.classList.remove('gearbox-sidebar-active', 'gearbox-icons-stacked');

        document.querySelectorAll('#sidebar-v2 a[id], .lead-connector a[id], #sidebar-v2 div.divider[id], .lead-connector div.divider[id]').forEach(el => {
            el.style.removeProperty('display');
            el.style.removeProperty('order');
        });

        closeOpenSubMenu();
        disableSubMenuSystem();
    }

    function applySettings(settings) {
        const nav = getNavContainer();
        if (!nav || !settings) return;

        latestSidebarSettings = settings;
        document.body.classList.add('gearbox-sidebar-active');

        nav.style.setProperty('display', 'flex', 'important');
        nav.style.setProperty('flex-direction', 'column', 'important');

        if (openSubMenu.element) return;

        const allItems = Array.from(nav.querySelectorAll(':scope > [id]'));
        const visibleIds = new Set(settings.order || []);

        allItems.forEach(el => {
            if (visibleIds.has(el.id)) {
                el.style.setProperty('display', el.tagName.toLowerCase() === 'a' ? 'flex' : 'flex', 'important');
                el.style.setProperty('order', settings.order.indexOf(el.id), 'important');
            } else {
                el.style.setProperty('display', 'none', 'important');
            }
        });

        (settings.order || []).forEach(id => {
            const el = document.getElementById(id);
            if (el && el.parentNode === nav && el.style.display !== 'none') {
                nav.appendChild(el);

                const next = el.nextElementSibling;
                if (next && next.classList.contains('sub-menu-container')) {
                    nav.appendChild(next);
                }
            }
        });

        document.body.classList.toggle('gearbox-icons-stacked', !!settings.stackIcons);

        updateSubMenuSystem(settings);
    }

    async function loadAndApplySavedSettings() {
        const defaults = {
            order: MAIN_NAV_COMPONENTS.map(c => c.id),
            stackIcons: false,
            enableSubMenus: true,
            subMenuTrigger: 'contextmenu'
        };

        const saved = await supabaseHelper.get(storageKey);

        if (!saved) {
            restoreDefaultSidebar();
            return;
        }

        let settings = { ...defaults, ...safeJsonParse(saved, {}) };

        const validIds = new Set([
            ...MAIN_NAV_COMPONENTS.map(c => c.id),
            ...CUSTOM_DIVIDERS.map(c => c.id)
        ]);

        settings.order = (settings.order || []).filter(id => validIds.has(id));

        // Add newly discovered items not yet saved, so HighLevel updates do not make them disappear forever.
        MAIN_NAV_COMPONENTS.forEach(c => {
            if (!settings.order.includes(c.id) && document.getElementById(c.id)) {
                settings.order.push(c.id);
            }
        });

        applySettings(settings);
    }

    // =====================================================================
    // ICONS / RENAMES / LOGO / APPEARANCE
    // =====================================================================

    function getIconElement(navLink) {
        if (!navLink) return null;
        return navLink.querySelector('img.custom-sidebar-icon, img, svg, span.h-5, i');
    }

    function ensureImageBasedIcon(navLink) {
        if (!navLink) return null;

        let existing = navLink.querySelector('img.custom-sidebar-icon');
        if (existing) return existing;

        const newImg = document.createElement('img');
        newImg.className = 'custom-sidebar-icon';
        newImg.alt = '';

        const oldIcon = getIconElement(navLink);
        if (oldIcon && oldIcon.parentNode) {
            oldIcon.parentNode.replaceChild(newImg, oldIcon);
        } else {
            const title = navLink.querySelector('.nav-title');
            if (title) navLink.insertBefore(newImg, title);
            else navLink.prepend(newImg);
        }

        navLink.classList.add('hide-before-pseudo');
        return newImg;
    }

    function applyIconStyles() {
        Object.entries(currentIconSettings || {}).forEach(([id, settings]) => {
            const navLink = document.getElementById(id);
            if (!navLink || !settings) return;

            if (settings.name) {
                const img = ensureImageBasedIcon(navLink);
                if (img) {
                    img.src = String(settings.name).startsWith('http') ? settings.name : iconBaseUrl + settings.name;
                    img.style.width = `${Number(settings.size) || 24}px`;
                    img.style.height = `${Number(settings.size) || 24}px`;
                    img.style.marginRight = document.body.classList.contains('gearbox-icons-stacked') ? '0' : '8px';
                }
            } else if (settings.size) {
                const icon = getIconElement(navLink);
                if (icon) {
                    icon.style.width = `${Number(settings.size) || 24}px`;
                    icon.style.height = `${Number(settings.size) || 24}px`;
                }
            }
        });
    }

    async function loadAndApplyIconSettings() {
        const saved = await supabaseHelper.get(iconStorageKey);
        currentIconSettings = safeJsonParse(saved, {});

        if (!saved) {
            document.querySelectorAll('img.custom-sidebar-icon').forEach(img => img.remove());
            document.querySelectorAll('#sidebar-v2 a[id], .lead-connector a[id]').forEach(link => {
                link.classList.remove('hide-before-pseudo');
            });
        }

        applyIconStyles();
    }

    async function saveIconStyle(id, key, value) {
        if (!currentIconSettings[id]) currentIconSettings[id] = {};
        currentIconSettings[id][key] = value;
        await supabaseHelper.set(iconStorageKey, JSON.stringify(currentIconSettings));
    }

    function applyRenames() {
        Object.entries(currentRenameSettings || {}).forEach(([id, newName]) => {
            const navLink = document.getElementById(id);
            if (!navLink || !newName) return;

            const title = navLink.querySelector('.nav-title');
            if (title) title.textContent = ` ${newName} `;
        });
    }

    async function loadAndApplyRenameSettings() {
        const saved = await supabaseHelper.get(renameStorageKey);
        currentRenameSettings = safeJsonParse(saved, {});

        if (!saved) {
            document.querySelectorAll('#sidebar-v2 a[id] .nav-title, .lead-connector a[id] .nav-title').forEach(span => {
                const link = span.closest('a[id]');
                const comp = MAIN_NAV_COMPONENTS.find(c => c.id === link?.id);
                if (comp) span.textContent = ` ${comp.name} `;
            });
        }

        applyRenames();
    }

    async function saveRename(id, name) {
        if (name && name.trim()) currentRenameSettings[id] = name.trim();
        else delete currentRenameSettings[id];

        await supabaseHelper.set(renameStorageKey, JSON.stringify(currentRenameSettings));
    }

    function applyBackground(settings) {
        const sidebar = getSidebar();
        if (!sidebar) return;

        if (!settings || !settings.type || settings.type === 'default') {
            sidebar.style.removeProperty('background');
            return;
        }

        let bg = '';

        if (settings.type === 'gradient') {
            bg = `linear-gradient(${Number(settings.angle) || 90}deg, ${settings.color1 || '#ffffff'}, ${settings.color2 || '#f0f0f0'})`;
        } else {
            bg = settings.color1 || '#ffffff';
        }

        sidebar.style.setProperty('background', bg, 'important');
    }

    async function loadAndApplyAppearanceSettings() {
        const saved = await supabaseHelper.get(appearanceStorageKey);
        currentAppearanceSettings = safeJsonParse(saved, {});

        if (!saved) {
            applyBackground(null);
            updateDynamicStyles({});
            return;
        }

        applyBackground(currentAppearanceSettings.background);
        updateDynamicStyles(currentAppearanceSettings);
    }

    async function applyLogo() {
        if (!ENABLE_LOGO_CUSTOMIZATION) return;

        const logoContainer = document.querySelector('.agency-logo-container');
        if (!logoContainer) return;

        const savedUrl = await supabaseHelper.get(logoStorageKey);
        const savedHeight = await supabaseHelper.get(logoHeightStorageKey) || '40';

        const original = logoContainer.querySelector('.agency-logo');
        let custom = logoContainer.querySelector('img.custom-agency-logo');

        if (savedUrl && String(savedUrl).trim()) {
            if (!custom) {
                custom = document.createElement('img');
                custom.className = 'custom-agency-logo';
                custom.style.maxWidth = '100%';
                custom.style.objectFit = 'contain';
                logoContainer.appendChild(custom);
            }

            custom.src = savedUrl;
            custom.style.maxHeight = `${Number(savedHeight) || 40}px`;
            custom.style.display = '';

            if (original) original.style.display = 'none';
        } else {
            if (custom) custom.style.display = 'none';
            if (original) original.style.display = '';
        }
    }

    // =====================================================================
    // BUTTON
    // =====================================================================

    function getButtonDefaultSettings() {
        return {
            top: '8',
            bottom: 'auto',
            left: '8',
            right: 'auto',
            bgColor: '#007aff',
            iconColor: '#ffffff',
            br_tl: '8',
            br_tr: '8',
            br_bl: '8',
            br_br: '8'
        };
    }

    function applyButtonStyles(settings) {
        const btn = document.getElementById(buttonId);
        if (!btn) return;

        btn.style.top = 'auto';
        btn.style.bottom = 'auto';
        btn.style.left = 'auto';
        btn.style.right = 'auto';

        if (settings.top !== 'auto' && settings.top !== '') btn.style.top = `${settings.top}px`;
        if (settings.bottom !== 'auto' && settings.bottom !== '') btn.style.bottom = `${settings.bottom}px`;
        if (settings.left !== 'auto' && settings.left !== '') btn.style.left = `${settings.left}px`;
        if (settings.right !== 'auto' && settings.right !== '') btn.style.right = `${settings.right}px`;

        btn.style.backgroundColor = settings.bgColor || '#007aff';
        btn.style.borderRadius = `${settings.br_tl || 8}px ${settings.br_tr || 8}px ${settings.br_br || 8}px ${settings.br_bl || 8}px`;

        const svg = btn.querySelector('svg');
        if (svg) svg.style.fill = settings.iconColor || '#ffffff';
    }

    async function loadAndApplyButtonSettings() {
        const saved = await supabaseHelper.get(buttonStorageKey);
        const settings = { ...getButtonDefaultSettings(), ...safeJsonParse(saved, {}) };
        applyButtonStyles(settings);
    }

    function createAndAppendButton() {
        if (document.getElementById(buttonId)) return;

        const btn = document.createElement('button');
        btn.id = buttonId;
        btn.title = 'Customize Sidebar';
        btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
            </svg>
        `;

        Object.assign(btn.style, {
            position: 'fixed',
            width: '36px',
            height: '36px',
            zIndex: '2147483645',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,.18)'
        });

        document.body.appendChild(btn);

        let pressTimer = null;
        let wasDragged = false;
        let offsetX = 0;
        let offsetY = 0;

        const onMove = e => {
            if (!isDraggingButton) return;

            wasDragged = true;

            const rect = btn.getBoundingClientRect();
            let left = e.clientX - offsetX;
            let top = e.clientY - offsetY;

            left = Math.max(0, Math.min(left, window.innerWidth - rect.width));
            top = Math.max(0, Math.min(top, window.innerHeight - rect.height));

            btn.style.left = `${left}px`;
            btn.style.top = `${top}px`;
            btn.style.right = 'auto';
            btn.style.bottom = 'auto';
        };

        btn.addEventListener('mousedown', e => {
            wasDragged = false;
            pressTimer = setTimeout(() => {
                isDraggingButton = true;
                btn.classList.add('dragging');

                const rect = btn.getBoundingClientRect();
                offsetX = e.clientX - rect.left;
                offsetY = e.clientY - rect.top;

                document.addEventListener('mousemove', onMove);
            }, 250);

            e.preventDefault();
        });

        document.addEventListener('mouseup', async () => {
            clearTimeout(pressTimer);

            if (isDraggingButton) {
                const saved = await supabaseHelper.get(buttonStorageKey);
                const settings = { ...getButtonDefaultSettings(), ...safeJsonParse(saved, {}) };

                settings.top = btn.style.top.replace('px', '') || '8';
                settings.left = btn.style.left.replace('px', '') || '8';
                settings.bottom = 'auto';
                settings.right = 'auto';

                await supabaseHelper.set(buttonStorageKey, JSON.stringify(settings));
            }

            btn.classList.remove('dragging');
            document.removeEventListener('mousemove', onMove);
            isDraggingButton = false;
        });

        btn.addEventListener('click', e => {
            if (wasDragged) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }

            createMainPopup();
        });
    }

    // =====================================================================
    // SUBMENUS
    // =====================================================================

    function closeOpenSubMenu() {
        if (openSubMenu.element) {
            const el = openSubMenu.element;
            el.classList.remove('is-open');
            setTimeout(() => {
                if (el && el.parentNode) el.remove();
            }, 260);
        }

        openSubMenu = { parent: null, element: null };
    }

    function openSubMenuFor(targetLink) {
        if (!targetLink) return;

        if (closeSubMenuTimer) clearTimeout(closeSubMenuTimer);

        if (openSubMenu.parent === targetLink) return;
        if (openSubMenu.element) closeOpenSubMenu();

        const items = subMenuConfig[targetLink.id];
        if (!items || !items.length) return;

        const container = document.createElement('div');
        container.className = 'sub-menu-container';

        if (targetLink.style.order) {
            container.style.order = targetLink.style.order;
        }

        items.forEach(item => {
            const link = document.createElement('a');
            link.className = 'sub-menu-link';
            link.textContent = item.text;

            if (item.href) {
                link.href = processHref(item.href);
            } else if (item.clickId) {
                link.href = '#';
                link.addEventListener('click', e => {
                    e.preventDefault();

                    const parent = document.getElementById(targetLink.id);
                    if (parent) parent.click();

                    waitForElementAndClick(item.clickId);
                    closeOpenSubMenu();
                });
            } else {
                link.href = '#';
            }

            container.appendChild(link);
        });

        targetLink.insertAdjacentElement('afterend', container);
        openSubMenu = { parent: targetLink, element: container };

        setTimeout(() => container.classList.add('is-open'), 10);
    }

    function handleSidebarMouseOver(e) {
        const link = e.target.closest('a[id]');
        if (link && subMenuConfig[link.id]) {
            openSubMenuFor(link);
        }
    }

    function handleSidebarMouseOut(e) {
        const sidebar = getSidebar();
        if (sidebar && e.relatedTarget && sidebar.contains(e.relatedTarget)) return;

        closeSubMenuTimer = setTimeout(closeOpenSubMenu, 300);
    }

    function handleSidebarContextMenu(e) {
        const link = e.target.closest('a[id]');
        if (link && subMenuConfig[link.id] && subMenuConfig[link.id].length) {
            e.preventDefault();
            openSubMenuFor(link);
        }
    }

    function handleGlobalClick(e) {
        if (!e.target.closest('#sidebar-v2, .lead-connector, .sub-menu-container')) {
            closeOpenSubMenu();
        }
    }

    function disableSubMenuSystem() {
        const sidebar = getSidebar();
        if (sidebar) {
            sidebar.removeEventListener('mouseover', handleSidebarMouseOver);
            sidebar.removeEventListener('mouseout', handleSidebarMouseOut);
            sidebar.removeEventListener('contextmenu', handleSidebarContextMenu);
        }

        document.removeEventListener('click', handleGlobalClick);
        closeOpenSubMenu();
    }

    function updateSubMenuSystem(settings) {
        const sidebar = getSidebar();
        if (!sidebar) return;

        sidebar.removeEventListener('mouseover', handleSidebarMouseOver);
        sidebar.removeEventListener('mouseout', handleSidebarMouseOut);
        sidebar.removeEventListener('contextmenu', handleSidebarContextMenu);
        document.removeEventListener('click', handleGlobalClick);

        if (!settings?.enableSubMenus) {
            disableSubMenuSystem();
            return;
        }

        if (settings.subMenuTrigger === 'hover') {
            sidebar.addEventListener('mouseover', handleSidebarMouseOver);
            sidebar.addEventListener('mouseout', handleSidebarMouseOut);
        } else {
            sidebar.addEventListener('contextmenu', handleSidebarContextMenu);
            document.addEventListener('click', handleGlobalClick);
        }
    }

    // =====================================================================
    // POPUPS
    // =====================================================================

    function createDraggableComponent(id, name) {
        const div = document.createElement('div');
        div.className = 'gearbox-draggable-component';
        div.dataset.id = id;
        div.draggable = true;

        if (id.includes('divider')) {
            div.classList.add('divider-component');
            div.textContent = '--- Divider ---';
        } else {
            const iconSize = currentIconSettings?.[id]?.size || '24';

            div.innerHTML = `
                <span class="gearbox-component-name">${escapeHtml(name)}</span>
                <div class="gearbox-component-controls">
                    <button type="button" class="gearbox-rename-btn">Rename</button>
                    <button type="button" class="gearbox-icon-btn">Icon</button>
                    <input type="number" class="gearbox-size-input" value="${escapeHtml(iconSize)}" min="10" max="50" title="Icon Size">
                </div>
            `;
        }

        div.addEventListener('dragstart', e => {
            isDragging = true;
            draggedItem = e.target.closest('.gearbox-draggable-component');
            if (draggedItem) {
                draggedItem.style.opacity = '0.5';
            }
        });

        div.addEventListener('dragend', () => {
            isDragging = false;
            if (draggedItem) draggedItem.style.opacity = '1';
            draggedItem = null;
        });

        return div;
    }

    function getDragAfterElement(container, y) {
        const items = [...container.querySelectorAll('.gearbox-draggable-component:not([style*="opacity: 0.5"])')];

        return items.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;

            if (offset < 0 && offset > closest.offset) {
                return { offset, element: child };
            }

            return closest;
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    async function saveSidebarPopupSettings(popup) {
        const visible = popup.querySelector('#gearbox-visible-items');
        const order = Array.from(visible.querySelectorAll('.gearbox-draggable-component')).map(item => item.dataset.id);

        const stackIcons = popup.querySelector('#gearbox-stack-icons').checked;
        const enableSubMenus = popup.querySelector('#gearbox-enable-submenus').checked;
        const subMenuTrigger = popup.querySelector('input[name="gearbox-submenu-trigger"]:checked')?.value || 'contextmenu';

        const settings = { order, stackIcons, enableSubMenus, subMenuTrigger };

        await supabaseHelper.set(storageKey, JSON.stringify(settings));
        applySettings(settings);
        await loadAndApplySavedSettings();

        const overlay = popup.closest('.gearbox-popup-overlay');
        if (overlay) overlay.remove();
    }

    async function createMainPopup() {
        if (document.querySelector('.gearbox-slide-popup')) return;

        discoverAndRegisterNavComponents();

        const defaults = {
            order: MAIN_NAV_COMPONENTS.map(c => c.id),
            stackIcons: false,
            enableSubMenus: true,
            subMenuTrigger: 'contextmenu'
        };

        const saved = await supabaseHelper.get(storageKey);
        const settings = { ...defaults, ...safeJsonParse(saved, {}) };
        const visibleIds = new Set(settings.order || []);

        const overlay = document.createElement('div');
        overlay.className = 'gearbox-popup-overlay';

        const popup = document.createElement('div');
        popup.id = popupId;
        popup.className = 'gearbox-slide-popup';

        popup.innerHTML = `
            <div style="padding:15px 22px; border-bottom:1px solid #e5e7eb; display:flex; align-items:center; justify-content:space-between; flex-shrink:0;">
                <h3 style="margin:0; font-size:18px; color:#111827;">Customize Navigation</h3>
                <div style="display:flex; align-items:center; gap:8px;">
                    <button type="button" class="gearbox-secondary-button" id="gearbox-appearance-btn">Appearance</button>
                    ${ENABLE_LOGO_CUSTOMIZATION ? '<button type="button" class="gearbox-secondary-button" id="gearbox-logo-btn">Logo</button>' : ''}
                    <button type="button" class="gearbox-secondary-button" id="gearbox-standard-btn">Standard</button>
                    <button type="button" class="gearbox-secondary-button" id="gearbox-reset-btn">Reset</button>
                    <button type="button" class="gearbox-secondary-button" id="gearbox-close-btn" style="font-size:22px; line-height:1;">×</button>
                </div>
            </div>

            <div style="padding:14px 22px; flex:1; overflow:auto;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin:10px 0 8px;">
                    <h4 style="margin:0;">Visible Menu Items</h4>
                    <small>Drag to reorder</small>
                </div>
                <div id="gearbox-visible-items" class="gearbox-drag-list"></div>

                <h4 style="margin:18px 0 8px;">Hidden Menu Items</h4>
                <div id="gearbox-hidden-items" class="gearbox-drag-list"></div>
            </div>

            <div style="padding:15px 22px; border-top:1px solid #e5e7eb; display:flex; flex-wrap:wrap; gap:14px; justify-content:space-between; align-items:center; flex-shrink:0;">
                <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center;">
                    <label><input type="checkbox" id="gearbox-stack-icons" ${settings.stackIcons ? 'checked' : ''}> Stack Icons</label>
                    <label><input type="checkbox" id="gearbox-enable-submenus" ${settings.enableSubMenus ? 'checked' : ''}> Dropdowns</label>
                    <label><input type="radio" name="gearbox-submenu-trigger" value="hover" ${settings.subMenuTrigger === 'hover' ? 'checked' : ''}> Hover</label>
                    <label><input type="radio" name="gearbox-submenu-trigger" value="contextmenu" ${settings.subMenuTrigger !== 'hover' ? 'checked' : ''}> Right Click</label>
                </div>
                <button type="button" class="gearbox-save-button" id="gearbox-save-sidebar">Save Changes</button>
            </div>
        `;

        overlay.appendChild(popup);
        document.body.appendChild(overlay);

        const visibleList = popup.querySelector('#gearbox-visible-items');
        const hiddenList = popup.querySelector('#gearbox-hidden-items');

        const allKnown = [...MAIN_NAV_COMPONENTS, ...CUSTOM_DIVIDERS];

        const sortedVisible = allKnown
            .filter(c => visibleIds.has(c.id))
            .sort((a, b) => settings.order.indexOf(a.id) - settings.order.indexOf(b.id));

        const hidden = allKnown.filter(c => !visibleIds.has(c.id));

        sortedVisible.forEach(c => {
            visibleList.appendChild(createDraggableComponent(c.id, currentRenameSettings[c.id] || c.name));
        });

        hidden.forEach(c => {
            hiddenList.appendChild(createDraggableComponent(c.id, currentRenameSettings[c.id] || c.name));
        });

        setTimeout(() => popup.classList.add('is-open'), 10);

        popup.querySelector('#gearbox-close-btn').onclick = () => overlay.remove();
        overlay.onclick = e => {
            if (e.target === overlay) overlay.remove();
        };

        popup.querySelector('#gearbox-save-sidebar').onclick = () => saveSidebarPopupSettings(popup);

        popup.querySelector('#gearbox-appearance-btn').onclick = createAppearancePopup;

        const logoBtn = popup.querySelector('#gearbox-logo-btn');
        if (logoBtn) logoBtn.onclick = createLogoPopup;

        popup.querySelector('#gearbox-standard-btn').onclick = async () => {
            if (!confirm('Apply standard GearBOX icon and layout settings?')) return;

            const savedMain = await supabaseHelper.get(storageKey);
            const mainSettings = { ...defaults, ...safeJsonParse(savedMain, {}) };
            mainSettings.stackIcons = true;
            mainSettings.enableSubMenus = true;

            await supabaseHelper.set(storageKey, JSON.stringify(mainSettings));

            const savedIcons = await supabaseHelper.get(iconStorageKey);
            const icons = safeJsonParse(savedIcons, {});

            MAIN_NAV_COMPONENTS.forEach(c => {
                if (standardIconSettings[c.id]) {
                    if (!icons[c.id]) icons[c.id] = {};
                    icons[c.id].name = standardIconSettings[c.id];
                    icons[c.id].size = '30';
                }
            });

            await supabaseHelper.set(iconStorageKey, JSON.stringify(icons));
            location.reload();
        };

        popup.querySelector('#gearbox-reset-btn').onclick = async () => {
            if (!confirm('Reset all custom sidebar settings? This cannot be undone.')) return;

            const keys = [
                storageKey,
                buttonStorageKey,
                iconStorageKey,
                renameStorageKey,
                appearanceStorageKey,
                logoStorageKey,
                logoHeightStorageKey
            ];

            await Promise.all(keys.map(k => supabaseHelper.remove(k)));
            location.reload();
        };

        [visibleList, hiddenList].forEach(list => {
            list.addEventListener('dragover', e => {
                e.preventDefault();
                if (!draggedItem) return;

                const after = getDragAfterElement(list, e.clientY);
                if (after == null) list.appendChild(draggedItem);
                else list.insertBefore(draggedItem, after);
            });
        });

        popup.addEventListener('click', e => {
            const btn = e.target.closest('button');
            if (!btn) return;

            const row = btn.closest('.gearbox-draggable-component');
            if (!row) return;

            const navId = row.dataset.id;

            if (btn.classList.contains('gearbox-icon-btn')) {
                createIconPicker(navId);
            }

            if (btn.classList.contains('gearbox-rename-btn')) {
                createRenamePopup(navId);
            }
        });

        popup.addEventListener('input', async e => {
            if (!e.target.classList.contains('gearbox-size-input')) return;

            const row = e.target.closest('.gearbox-draggable-component');
            if (!row) return;

            await saveIconStyle(row.dataset.id, 'size', e.target.value);
            applyIconStyles();
        });
    }

    function createCenteredPanel(title, width = '460px') {
        const overlay = document.createElement('div');
        overlay.className = 'gearbox-settings-overlay';

        const panel = document.createElement('div');
        panel.style.cssText = `
            width:90%;
            max-width:${width};
            background:white;
            border-radius:12px;
            box-shadow:0 8px 30px rgba(0,0,0,.18);
            overflow:hidden;
            color:#111827;
        `;

        panel.innerHTML = `
            <div style="padding:15px 20px; border-bottom:1px solid #e5e7eb; display:flex; align-items:center; justify-content:space-between;">
                <h3 style="margin:0; font-size:18px;">${escapeHtml(title)}</h3>
                <button type="button" class="gearbox-secondary-button gearbox-panel-close" style="font-size:22px; line-height:1;">×</button>
            </div>
            <div class="gearbox-panel-body" style="padding:20px; max-height:65vh; overflow:auto;"></div>
            <div class="gearbox-panel-footer" style="padding:15px 20px; border-top:1px solid #e5e7eb; display:flex; gap:10px; justify-content:flex-end;"></div>
        `;

        overlay.appendChild(panel);
        document.body.appendChild(overlay);

        panel.querySelector('.gearbox-panel-close').onclick = () => overlay.remove();
        overlay.onclick = e => {
            if (e.target === overlay) overlay.remove();
        };

        return {
            overlay,
            panel,
            body: panel.querySelector('.gearbox-panel-body'),
            footer: panel.querySelector('.gearbox-panel-footer')
        };
    }

    async function createRenamePopup(navId) {
        const nav = document.getElementById(navId);
        if (!nav) return;

        const comp = MAIN_NAV_COMPONENTS.find(c => c.id === navId);
        const originalName = comp?.name || nav.querySelector('.nav-title')?.textContent?.trim() || navId;
        const currentName = currentRenameSettings[navId] || nav.querySelector('.nav-title')?.textContent?.trim() || originalName;

        const { overlay, body, footer } = createCenteredPanel('Rename Menu Item');

        body.innerHTML = `
            <label style="display:block; margin-bottom:8px;">New name for <strong>${escapeHtml(originalName)}</strong></label>
            <input id="gearbox-rename-input" type="text" value="${escapeHtml(currentName)}" style="width:100%; padding:10px; border:1px solid #d1d5db; border-radius:6px;">
        `;

        footer.innerHTML = `
            <button type="button" class="gearbox-secondary-button" id="gearbox-reset-rename">Reset</button>
            <button type="button" class="gearbox-save-button" id="gearbox-save-rename">Save</button>
        `;

        const input = body.querySelector('#gearbox-rename-input');
        input.focus();
        input.select();

        footer.querySelector('#gearbox-save-rename').onclick = async () => {
            const value = input.value.trim();
            await saveRename(navId, value);

            const title = nav.querySelector('.nav-title');
            if (title) title.textContent = ` ${value || originalName} `;

            document.querySelectorAll(`.gearbox-draggable-component[data-id="${CSS.escape(navId)}"] .gearbox-component-name`).forEach(el => {
                el.textContent = value || originalName;
            });

            overlay.remove();
        };

        footer.querySelector('#gearbox-reset-rename').onclick = async () => {
            await saveRename(navId, '');

            const title = nav.querySelector('.nav-title');
            if (title) title.textContent = ` ${originalName} `;

            overlay.remove();
        };
    }

    async function createLogoPopup() {
        const currentUrl = await supabaseHelper.get(logoStorageKey) || '';
        const currentHeight = await supabaseHelper.get(logoHeightStorageKey) || '40';

        const { overlay, body, footer } = createCenteredPanel('Customize Agency Logo');

        body.innerHTML = `
            <label style="display:block; margin-bottom:8px;">Logo Image URL</label>
            <input id="gearbox-logo-url" type="text" value="${escapeHtml(currentUrl)}" placeholder="https://..." style="width:100%; padding:10px; border:1px solid #d1d5db; border-radius:6px; margin-bottom:14px;">
            <label style="display:block; margin-bottom:8px;">Logo Height</label>
            <input id="gearbox-logo-height" type="number" value="${escapeHtml(currentHeight)}" style="width:100%; padding:10px; border:1px solid #d1d5db; border-radius:6px;">
        `;

        footer.innerHTML = `
            <button type="button" class="gearbox-secondary-button" id="gearbox-remove-logo">Remove</button>
            <button type="button" class="gearbox-save-button" id="gearbox-save-logo">Save</button>
        `;

        footer.querySelector('#gearbox-save-logo').onclick = async () => {
            await supabaseHelper.set(logoStorageKey, body.querySelector('#gearbox-logo-url').value.trim());
            await supabaseHelper.set(logoHeightStorageKey, body.querySelector('#gearbox-logo-height').value || '40');
            await applyLogo();
            overlay.remove();
        };

        footer.querySelector('#gearbox-remove-logo').onclick = async () => {
            await supabaseHelper.remove(logoStorageKey);
            await supabaseHelper.remove(logoHeightStorageKey);
            await applyLogo();
            overlay.remove();
        };
    }

    async function createAppearancePopup() {
        if (!ENABLE_APPEARANCE_CONTROLS) return;

        const defaults = {
            background: { type: 'default', color1: '#ffffff', color2: '#f0f0f0', angle: 90 },
            hoverColor: '#e5e7eb',
            hoverColorEnabled: true,
            textColor: '#374151',
            textColorEnabled: true,
            textHoverColor: '#000000',
            textHoverColorEnabled: true,
            textSize: '14',
            textSizeEnabled: true,
            subMenuTextColor: '#6b7280',
            subMenuTextColorEnabled: true,
            subMenuTextSize: '13',
            subMenuTextSizeEnabled: true
        };

        currentAppearanceSettings = {
            ...defaults,
            ...currentAppearanceSettings,
            background: {
                ...defaults.background,
                ...(currentAppearanceSettings.background || {})
            }
        };

        const { overlay, body, footer } = createCenteredPanel('Customize Appearance', '520px');

        body.innerHTML = `
            <fieldset class="gearbox-fieldset">
                <legend>Sidebar Background</legend>
                <div class="gearbox-form-row">
                    <label><input type="radio" name="gearbox-bg-type" value="default" ${currentAppearanceSettings.background.type === 'default' ? 'checked' : ''}> Default</label>
                    <label><input type="radio" name="gearbox-bg-type" value="solid" ${currentAppearanceSettings.background.type === 'solid' ? 'checked' : ''}> Solid</label>
                    <label><input type="radio" name="gearbox-bg-type" value="gradient" ${currentAppearanceSettings.background.type === 'gradient' ? 'checked' : ''}> Gradient</label>
                </div>
                <div class="gearbox-form-row">
                    <label>Color 1</label>
                    <input type="color" id="gearbox-bg-color1" value="${escapeHtml(currentAppearanceSettings.background.color1)}">
                </div>
                <div class="gearbox-form-row">
                    <label>Color 2</label>
                    <input type="color" id="gearbox-bg-color2" value="${escapeHtml(currentAppearanceSettings.background.color2)}">
                </div>
                <div class="gearbox-form-row">
                    <label>Gradient Angle</label>
                    <input type="number" id="gearbox-bg-angle" min="0" max="360" value="${escapeHtml(currentAppearanceSettings.background.angle)}" style="width:90px;">
                </div>
            </fieldset>

            <fieldset class="gearbox-fieldset">
                <legend>Links</legend>
                <div class="gearbox-form-row">
                    <label class="gearbox-toggle-row"><input type="checkbox" id="gearbox-hover-enabled" ${currentAppearanceSettings.hoverColorEnabled ? 'checked' : ''}> Hover/Active Background</label>
                    <input type="color" id="gearbox-hover-color" value="${escapeHtml(currentAppearanceSettings.hoverColor)}">
                </div>

                <div class="gearbox-form-row">
                    <label class="gearbox-toggle-row"><input type="checkbox" id="gearbox-text-enabled" ${currentAppearanceSettings.textColorEnabled ? 'checked' : ''}> Text Color</label>
                    <input type="color" id="gearbox-text-color" value="${escapeHtml(currentAppearanceSettings.textColor)}">
                </div>

                <div class="gearbox-form-row">
                    <label class="gearbox-toggle-row"><input type="checkbox" id="gearbox-text-hover-enabled" ${currentAppearanceSettings.textHoverColorEnabled ? 'checked' : ''}> Hover Text Color</label>
                    <input type="color" id="gearbox-text-hover-color" value="${escapeHtml(currentAppearanceSettings.textHoverColor)}">
                </div>

                <div class="gearbox-form-row">
                    <label class="gearbox-toggle-row"><input type="checkbox" id="gearbox-text-size-enabled" ${currentAppearanceSettings.textSizeEnabled ? 'checked' : ''}> Text Size</label>
                    <input type="number" id="gearbox-text-size" min="8" max="24" value="${escapeHtml(currentAppearanceSettings.textSize)}" style="width:90px;">
                </div>
            </fieldset>

            <fieldset class="gearbox-fieldset">
                <legend>Dropdown Text</legend>
                <div class="gearbox-form-row">
                    <label class="gearbox-toggle-row"><input type="checkbox" id="gearbox-submenu-text-enabled" ${currentAppearanceSettings.subMenuTextColorEnabled ? 'checked' : ''}> Text Color</label>
                    <input type="color" id="gearbox-submenu-text-color" value="${escapeHtml(currentAppearanceSettings.subMenuTextColor)}">
                </div>

                <div class="gearbox-form-row">
                    <label class="gearbox-toggle-row"><input type="checkbox" id="gearbox-submenu-size-enabled" ${currentAppearanceSettings.subMenuTextSizeEnabled ? 'checked' : ''}> Text Size</label>
                    <input type="number" id="gearbox-submenu-size" min="8" max="24" value="${escapeHtml(currentAppearanceSettings.subMenuTextSize)}" style="width:90px;">
                </div>
            </fieldset>
        `;

        footer.innerHTML = `
            <button type="button" class="gearbox-secondary-button" id="gearbox-reset-appearance">Reset</button>
            <button type="button" class="gearbox-save-button" id="gearbox-save-appearance">Save</button>
        `;

        function getAppearanceFromPanel() {
            const bgType = body.querySelector('input[name="gearbox-bg-type"]:checked')?.value || 'default';

            return {
                background: {
                    type: bgType,
                    color1: body.querySelector('#gearbox-bg-color1').value,
                    color2: body.querySelector('#gearbox-bg-color2').value,
                    angle: body.querySelector('#gearbox-bg-angle').value
                },
                hoverColor: body.querySelector('#gearbox-hover-color').value,
                hoverColorEnabled: body.querySelector('#gearbox-hover-enabled').checked,
                textColor: body.querySelector('#gearbox-text-color').value,
                textColorEnabled: body.querySelector('#gearbox-text-enabled').checked,
                textHoverColor: body.querySelector('#gearbox-text-hover-color').value,
                textHoverColorEnabled: body.querySelector('#gearbox-text-hover-enabled').checked,
                textSize: body.querySelector('#gearbox-text-size').value,
                textSizeEnabled: body.querySelector('#gearbox-text-size-enabled').checked,
                subMenuTextColor: body.querySelector('#gearbox-submenu-text-color').value,
                subMenuTextColorEnabled: body.querySelector('#gearbox-submenu-text-enabled').checked,
                subMenuTextSize: body.querySelector('#gearbox-submenu-size').value,
                subMenuTextSizeEnabled: body.querySelector('#gearbox-submenu-size-enabled').checked
            };
        }

        body.addEventListener('input', () => {
            const preview = getAppearanceFromPanel();
            applyBackground(preview.background);
            updateDynamicStyles(preview);
        });

        body.addEventListener('change', () => {
            const preview = getAppearanceFromPanel();
            applyBackground(preview.background);
            updateDynamicStyles(preview);
        });

        footer.querySelector('#gearbox-save-appearance').onclick = async () => {
            currentAppearanceSettings = getAppearanceFromPanel();
            await supabaseHelper.set(appearanceStorageKey, JSON.stringify(currentAppearanceSettings));
            applyBackground(currentAppearanceSettings.background);
            updateDynamicStyles(currentAppearanceSettings);
            overlay.remove();
        };

        footer.querySelector('#gearbox-reset-appearance').onclick = async () => {
            currentAppearanceSettings = {};
            await supabaseHelper.remove(appearanceStorageKey);
            applyBackground(null);
            updateDynamicStyles({});
            overlay.remove();
        };
    }

    async function createIconPicker(navId) {
        const nav = document.getElementById(navId);
        if (!nav) {
            alert('That sidebar item is not currently visible in HighLevel.');
            return;
        }

        ensureImageBasedIcon(nav);

        const overlay = document.createElement('div');
        overlay.className = 'gearbox-icon-picker-overlay';

        const panel = document.createElement('div');
        panel.style.cssText = 'width:90%; max-width:640px; max-height:82vh; background:#fff; border-radius:12px; box-shadow:0 8px 30px rgba(0,0,0,.18); overflow:auto;';

        panel.innerHTML = `
            <div style="padding:15px 20px; border-bottom:1px solid #e5e7eb; display:flex; justify-content:space-between; align-items:center;">
                <h3 style="margin:0; font-size:18px;">Select Icon</h3>
                <button type="button" class="gearbox-secondary-button" id="gearbox-icon-close" style="font-size:22px; line-height:1;">×</button>
            </div>
            <div style="display:flex; gap:10px; padding:14px 18px; border-bottom:1px solid #e5e7eb;">
                <input id="gearbox-custom-icon-url" type="text" placeholder="Or paste custom image URL..." style="flex:1; padding:10px; border:1px solid #d1d5db; border-radius:6px;">
                <button type="button" class="gearbox-save-button" id="gearbox-save-custom-icon">Save URL</button>
            </div>
            <div class="gearbox-icon-grid">
                ${iconList.map(name => `
                    <div class="gearbox-icon-item" data-icon="${escapeHtml(name)}" title="${escapeHtml(name)}">
                        <img src="${iconBaseUrl + escapeHtml(name)}" alt="">
                    </div>
                `).join('')}
            </div>
        `;

        overlay.appendChild(panel);
        document.body.appendChild(overlay);

        panel.querySelector('#gearbox-icon-close').onclick = () => overlay.remove();
        overlay.onclick = e => {
            if (e.target === overlay) overlay.remove();
        };

        panel.querySelector('.gearbox-icon-grid').onclick = async e => {
            const item = e.target.closest('.gearbox-icon-item');
            if (!item) return;

            const iconName = item.dataset.icon;
            const img = ensureImageBasedIcon(nav);

            if (img) {
                img.src = iconBaseUrl + iconName;
                await saveIconStyle(navId, 'name', iconName);
                applyIconStyles();
            }

            overlay.remove();
        };

        panel.querySelector('#gearbox-save-custom-icon').onclick = async () => {
            const url = panel.querySelector('#gearbox-custom-icon-url').value.trim();
            if (!url) {
                alert('Paste an image URL first.');
                return;
            }

            const img = ensureImageBasedIcon(nav);
            if (img) {
                img.src = url;
                await saveIconStyle(navId, 'name', url);
                applyIconStyles();
            }

            overlay.remove();
        };
    }

    // =====================================================================
    // MAIN SETUP
    // =====================================================================

    async function runSetup(retryCount = 0) {
        const maxRetries = 35;
        const nav = getNavContainer();

        if (!nav) {
            if (retryCount < maxRetries) {
                setTimeout(() => runSetup(retryCount + 1), 150);
            } else {
                console.warn('[GearBOX Customizer] Could not find HighLevel nav container.');
            }
            return;
        }

        if (!initialSetupDone) {
            injectBaseStyles();
            createAndAppendButton();
            initialSetupDone = true;
        }

        const customButton = document.getElementById(buttonId);

        if (isLocationView() && !isSettingsView()) {
            if (customButton) customButton.style.display = 'flex';

            discoverAndRegisterNavComponents();
            createCustomDividers();

            await loadAndApplySavedSettings();
            await loadAndApplyButtonSettings();
            await loadAndApplyIconSettings();
            await loadAndApplyRenameSettings();
            await loadAndApplyAppearanceSettings();
            await applyLogo();

            nav.style.visibility = 'visible';
        } else {
            if (customButton) customButton.style.display = 'none';
            restoreDefaultSidebar();
            nav.style.visibility = 'visible';
        }
    }

    function injectFonts() {
        const fonts = [
            { id: 'gearbox-font-inter', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' }
        ];

        fonts.forEach(fontInfo => {
            if (!document.getElementById(fontInfo.id)) {
                const link = document.createElement('link');
                link.id = fontInfo.id;
                link.rel = 'stylesheet';
                link.href = fontInfo.href;
                document.head.appendChild(link);
            }
        });
    }

    function startObserver() {
        const observer = new MutationObserver(mutations => {
            if (isDragging || isDraggingButton) return;
            if (openSubMenu.element) return;

            const pathChanged = window.location.pathname !== lastRunPath;

            const navChanged = mutations.some(m => {
                const nodes = [...m.addedNodes, ...m.removedNodes];

                return nodes.some(node => {
                    if (!(node instanceof HTMLElement)) return false;

                    return (
                        node.matches?.('#sidebar-v2, .lead-connector, .hl_nav-header, .hl_nav-header-without-footer, nav') ||
                        node.querySelector?.('#sidebar-v2, .lead-connector, .hl_nav-header, .hl_nav-header-without-footer, nav')
                    );
                });
            });

            if (!pathChanged && !navChanged) return;

            lastRunPath = window.location.pathname;

            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => runSetup(), 500);
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        setInterval(() => {
            if (window.location.pathname !== lastRunPath) {
                lastRunPath = window.location.pathname;
                runSetup();
            }
        }, 1200);
    }

    function init() {
        injectFonts();

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                runSetup();
                startObserver();
            });
        } else {
            runSetup();
            startObserver();
        }
    }

    init();

})();
