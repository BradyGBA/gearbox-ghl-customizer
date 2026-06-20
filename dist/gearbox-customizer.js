// -----------------------------------------------------------------------------
// GearBOX / HighLevel Platform Customizer
// Fixed unified version: Sidebar Customizer + Tours + Tasks + Location Access
// Intended for HighLevel Agency Custom JS as a single hosted script.
// -----------------------------------------------------------------------------
(function () {
  'use strict';

  // ===========================================================================
  // CONFIG
  // ===========================================================================
  const PC = {
    WORKER_URL: 'https://platformcustomizer.mymessagingapp.com/api.php',
    enableLogoCustomization: true,
    enableAdvancedAppearanceControls: true,
    ids: {
      mainButton: 'gbx-platform-customizer-button',
      popup: 'gbx-platform-customizer-popup',
      dynamicStyle: 'gbx-platform-customizer-dynamic-styles',
      baseStyle: 'gbx-platform-customizer-base-styles',
      widgetButtons: 'gbx-widget-buttons-container',
      tasksButton: 'gbx-header-tasks-btn',
      learnGear: 'gbx-learn-gear-icon',
      learnButton: 'gbx-learn-about-page-button',
      headerWrapper: 'gbx-dynamic-button-wrapper'
    },
    storage: {
      sidebar: 'customSidebarSettings',
      button: 'customButtonStyleSettings',
      icons: 'sidebarIconStyleSettings',
      renames: 'sidebarRenameSettings',
      logoUrl: 'agencyLogoUrl',
      logoHeight: 'agencyLogoHeight',
      appearance: 'sidebarAppearanceSettings',
      colors: 'customColors'
    },
    iconBaseUrl: 'https://platformcustomizer.mymessagingapp.com/static/',
    fallbackIcon: '3dicons-puzzle-front-color.png'
  };

  const subMenuConfig = {
    sb_dashboard: [],
    sb_launchpad: [],
    sb_marketplace: [],
    sb_settings: [],
    sb_conversations: [
      { text: 'Conversations', clickId: 'tb_conversations-tab' },
      { text: 'Manual Actions', clickId: 'tb_manial-actions' },
      { text: 'Snippets', clickId: 'tb_conversations-templates' },
      { text: 'Trigger Links', clickId: 'tb_trigger-links' }
    ],
    sb_calendars: [
      { text: 'Calendar View', clickId: 'tb_calendars-tab' },
      { text: 'Appointments List', clickId: 'tb_apppontment-tab' },
      { text: 'Calendar Settings', clickId: 'tb_calendar-settings-top' }
    ],
    sb_contacts: [
      { text: 'Smart Lists', clickId: 'tb_lists' },
      { text: 'Bulk Actions', clickId: 'tb_bulk-actions' },
      { text: 'Restore', clickId: 'tb_contacts-restore' },
      { text: 'Tasks', clickId: 'tb_tasks' },
      { text: 'Businesses', clickId: 'tb_business' },
      { text: 'Manage Smart Lists', clickId: 'tb_contacts-settings-top' }
    ],
    sb_opportunities: [
      { text: 'Opportunities', clickId: 'tb_opportunities-tab' },
      { text: 'Pipelines', clickId: 'tb_pipeline' },
      { text: 'Bulk Actions', clickId: 'tb_bulk-actions' }
    ],
    sb_payments: [
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
    'sb_AI Agents': [
      { text: 'AI Agents', clickId: 'tb_ai-agents-getting-started' },
      { text: 'Voice AI', clickId: 'tb_ai-agents-voice-ai' },
      { text: 'Conversation AI', clickId: 'tb_ai-agents-conversation-ai' },
      { text: 'Knowledgebase', clickId: 'tb_ai-agents-knowledge-base' },
      { text: 'Content AI', clickId: 'tb_ai-agents-content-ai' }
    ],
    sb_email_marketing: [
      { text: 'Social Planner', clickId: 'tb_social-planner' },
      { text: 'Email Stats', clickId: 'tb_email-builder' },
      { text: 'Snippets', clickId: 'tb_email-templates' },
      { text: 'Countdown Timers', clickId: 'tb_countdown-timer' },
      { text: 'Trigger Links', clickId: 'tb_trigger-links' },
      { text: 'Affiliate Manager', clickId: 'tb_affiliate-manager' },
      { text: 'Brand Boards', clickId: 'tb_brand-boards' },
      { text: 'Ad Manager', clickId: 'tb_ad-manager-home' }
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
    sb_automation: [
      { text: 'Workflows', clickId: 'tb_workflow' },
      { text: 'Settings', clickId: 'tb_workflow-settings-top' }
    ],
    sb_sites: [
      { text: 'Funnels', clickId: 'tb_funnels' },
      { text: 'Websites', clickId: 'tb_websites' },
      { text: 'Stores', clickId: 'tb_stores' },
      { text: 'Webinars', clickId: 'tb_webinars' },
      { text: 'Analytics', clickId: 'tb_analytics' },
      { text: 'Blogs', clickId: 'tb_blogs' },
      { text: 'Wordpress', clickId: 'tb_wordpress-v2' },
      { text: 'Client Portal', clickId: 'tb_clientportal' },
      { text: 'Forms', clickId: 'tb_form-builder' },
      { text: 'Surveys', clickId: 'tb_survey-builder' },
      { text: 'Quizzes', clickId: 'tb_quizz-builder' },
      { text: 'Chat Widget', clickId: 'tb_chat-widget' },
      { text: 'QR Codes', clickId: 'tb_qr-codes' },
      { text: 'Domains', clickId: 'tb_sites-domain-settings' }
    ],
    sb_memberships: [
      { text: 'Client Portal', clickId: 'tb_clientportalCommunities' },
      { text: 'Courses', clickId: 'tb_courses' },
      { text: 'Communities', clickId: 'tb_communities' },
      { text: 'Credentials', clickId: 'tb_certificates' },
      { text: 'GoKollab Marketplace', clickId: 'tb_gokollab' }
    ],
    sb_reputation: [
      { text: 'Overview', clickId: 'tb_reputation-overview' },
      { text: 'Requests', clickId: 'tb_reputations-requests' },
      { text: 'Reviews', clickId: 'tb_reputations-reviews' },
      { text: 'Widgets', clickId: 'tb_reputation-widgets' },
      { text: 'Listings', clickId: 'tb_online-listings' },
      { text: 'Settings', clickId: 'tb_reputation-settings' }
    ],
    sb_reporting: [
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

  const MAIN_NAV_COMPONENTS = [
    { id: 'sb_launchpad', name: 'Launchpad' },
    { id: 'sb_dashboard', name: 'Dashboard' },
    { id: 'sb_conversations', name: 'Conversations' },
    { id: 'sb_calendars', name: 'Calendars' },
    { id: 'sb_contacts', name: 'Contacts' },
    { id: 'sb_opportunities', name: 'Opportunities' },
    { id: 'sb_payments', name: 'Payments' },
    { id: 'sb_AI Agents', name: 'AI Agents' },
    { id: 'sb_email-marketing', name: 'Marketing' },
    { id: 'sb_automation', name: 'Automation' },
    { id: 'sb_sites', name: 'Sites' },
    { id: 'sb_memberships', name: 'Memberships' },
    { id: 'sb_app-media', name: 'Media Storage' },
    { id: 'sb_reputation', name: 'Reputation' },
    { id: 'sb_reporting', name: 'Reporting' },
    { id: 'sb_app-marketplace', name: 'App Marketplace' },
    { id: 'sb_settings', name: 'Settings' }
  ];

  const CUSTOM_DIVIDERS = [
    { id: 'custom-divider-1', name: 'Divider 1' },
    { id: 'custom-divider-2', name: 'Divider 2' },
    { id: 'custom-divider-3', name: 'Divider 3' }
  ];

  const iconList = [
    '3dicons-bag-front-color.png','3dicons-bell-front-color.png','3dicons-blender-front-color.png',
    '3dicons-boy-front-color.png','3dicons-brush-front-color.png','3dicons-bulb-front-color.png',
    '3dicons-calculator-front-color.png','3dicons-calender-front-color.png','3dicons-camera-front-color.png',
    '3dicons-chart-front-color.png','3dicons-chat-bubble-front-color.png','3dicons-clock-front-color.png',
    '3dicons-computer-front-color.png','3dicons-credit-card-front-color.png','3dicons-dollar-front-color.png',
    '3dicons-explorer-front-color.png','3dicons-file-text-front-color.png','3dicons-fire-front-color.png',
    '3dicons-flash-front-color.png','3dicons-folder-front-color.png','3dicons-gift-front-color.png',
    '3dicons-headphone-front-color.png','3dicons-heart-front-color.png','3dicons-key-front-color.png',
    '3dicons-link-front-color.png','3dicons-lock-front-color.png','3dicons-mail-front-color.png',
    '3dicons-megaphone-front-color.png','3dicons-minecraft-front-color.png','3dicons-money-front-color.png',
    '3dicons-notebook-front-color.png','3dicons-phone-front-color.png','3dicons-plus-front-color.png',
    '3dicons-puzzle-front-color.png','3dicons-rocket-front-color.png','3dicons-search-front-color.png',
    '3dicons-setting-front-color.png','3dicons-shield-front-color.png','3dicons-sphere-front-color.png',
    '3dicons-star-front-color.png','3dicons-target-front-color.png','3dicons-tick-front-color.png',
    '3dicons-trash-front-color.png','3dicons-user-front-color.png','3dicons-video-cam-front-color.png',
    '3dicons-world-front-color.png','3dicons-write-front-color.png'
  ];

  const standardIconSettings = {
    'sb_ai-employee-promo': '3dicons-flash-front-color.png',
    sb_launchpad: '3dicons-flash-front-color.png',
    sb_dashboard: '3dicons-dollar-front-color.png',
    sb_conversations: '3dicons-chat-bubble-front-color.png',
    sb_calendars: '3dicons-calender-front-color.png',
    sb_contacts: '3dicons-boy-front-color.png',
    sb_opportunities: '3dicons-money-front-color.png',
    sb_payments: '3dicons-credit-card-front-color.png',
    'sb_AI Agents': '3dicons-minecraft-front-color.png',
    'sb_email-marketing': '3dicons-megaphone-front-color.png',
    sb_automation: '3dicons-blender-front-color.png',
    sb_sites: '3dicons-sphere-front-color.png',
    sb_memberships: '3dicons-shield-front-color.png',
    'sb_app-media': '3dicons-video-cam-front-color.png',
    sb_reputation: '3dicons-star-front-color.png',
    sb_reporting: '3dicons-chart-front-color.png',
    'sb_app-marketplace': '3dicons-plus-front-color.png',
    sb_settings: '3dicons-setting-front-color.png'
  };

  // ===========================================================================
  // STATE
  // ===========================================================================
  let initialSetupDone = false;
  let isWidgetInitializationAttempted = false;
  let draggedItem = null;
  let isDragging = false;
  let isDraggingButton = false;
  let debounceTimer = null;
  let currentIconSettings = {};
  let currentRenameSettings = {};
  let currentAppearanceSettings = {};
  let openSubMenu = { parent: null, element: null };
  let closeSubMenuTimer = null;
  let lastRoute = '';

  // ===========================================================================
  // GENERAL HELPERS
  // ===========================================================================
  function safeJsonParse(value, fallback) {
    if (value === null || value === undefined || value === '') return fallback;
    if (typeof value === 'object') return value;
    try { return JSON.parse(value); } catch (e) { return fallback; }
  }

  function normalizeToolKey(key) {
    const aliases = {
      animated_tours: 'tours',
      onboarding_tasks: 'tasks',
      field_mappings: 'field_mappings',
      sidebar_customizations: 'sidebar',
      sidebar_customizer: 'sidebar',
      sidebar_customizations_tool: 'sidebar'
    };
    return aliases[key] || key;
  }

  function getNavContainer() {
    return document.querySelector('#sidebar-v2 .hl_nav-header > nav, #sidebar-v2 .hl_nav-header-without-footer > nav, .hl_nav-header > nav, .hl_nav-header-without-footer > nav');
  }

  function getSidebar() {
    return document.getElementById('sidebar-v2') || document.querySelector('.lead-connector');
  }

  function getContextLocationId() {
    try {
      if (window.gohighlevel && window.gohighlevel.location && window.gohighlevel.location.id) {
        const id = String(window.gohighlevel.location.id);
        localStorage.setItem('lastGhlLocationId_PlatformCustomizer', id);
        return id;
      }
    } catch (e) {}

    const parts = window.location.pathname.split('/').filter(Boolean);
    const idx = parts.indexOf('location');
    if (idx !== -1 && parts[idx + 1] && parts[idx + 1].length > 5) {
      const id = parts[idx + 1];
      localStorage.setItem('lastGhlLocationId_PlatformCustomizer', id);
      return id;
    }

    const match = window.location.href.match(/\/v2\/location\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      localStorage.setItem('lastGhlLocationId_PlatformCustomizer', match[1]);
      return match[1];
    }

    return localStorage.getItem('lastGhlLocationId_PlatformCustomizer') || null;
  }

  function getCurrentUserId() {
    try {
      return window.gohighlevel && window.gohighlevel.user ? window.gohighlevel.user.id : null;
    } catch (e) {
      return null;
    }
  }

  async function loadScriptOnce(id, src) {
    if (document.getElementById(id)) return true;
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.id = id;
      script.src = src;
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
    });
  }

  function closeAllPopups() {
    document.querySelectorAll(
      '.gbx-modal-overlay,.gbx-modal-content,.gbx-modal-close-btn,.gbx-sidebar,.gbx-dropdown,.settings-popup-overlay,.icon-picker-overlay,.popup-overlay,.slide-in-popup'
    ).forEach(el => el.remove());
  }

  function showAlert(message) {
    window.alert(message);
  }

  function button(label, className) {
    const b = document.createElement('button');
    b.textContent = label;
    b.className = className || '';
    return b;
  }

  // ===========================================================================
  // BACKEND / SUPABASE HELPER
  // ===========================================================================
  const backend = {
    async get(key) {
      const locationId = getContextLocationId();
      if (!locationId) return null;
      try {
        const res = await fetch(`${PC.WORKER_URL}/api/get-sidebar-setting?location_id=${encodeURIComponent(locationId)}&key=${encodeURIComponent(key)}`, { credentials: 'omit' });
        const json = await res.json();
        return json && json.status === 'success' ? json.data : null;
      } catch (e) {
        console.error('[GearBOX Customizer] GET failed:', key, e);
        return null;
      }
    },
    async set(key, value) {
      const locationId = getContextLocationId();
      if (!locationId) return null;
      try {
        const res = await fetch(`${PC.WORKER_URL}/api/set-sidebar-setting`, {
          method: 'POST',
          credentials: 'omit',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ location_id: locationId, key, value })
        });
        return await res.json().catch(() => null);
      } catch (e) {
        console.error('[GearBOX Customizer] SET failed:', key, e);
        return null;
      }
    },
    async remove(key) {
      const locationId = getContextLocationId();
      if (!locationId) return null;
      try {
        const res = await fetch(`${PC.WORKER_URL}/api/remove-sidebar-setting`, {
          method: 'POST',
          credentials: 'omit',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ location_id: locationId, key })
        });
        return await res.json().catch(() => null);
      } catch (e) {
        console.error('[GearBOX Customizer] REMOVE failed:', key, e);
        return null;
      }
    }
  };

  async function saveColors(colors) { return backend.set(PC.storage.colors, colors); }
  async function getColors() { return backend.get(PC.storage.colors); }
  async function resetColors() { return backend.remove(PC.storage.colors); }

  // ===========================================================================
  // BASE STYLES
  // ===========================================================================
  function injectFonts() {
    [
      { id: 'gbx-font-inter', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' },
      { id: 'gbx-font-figtree', href: 'https://fonts.googleapis.com/css2?family=Figtree:wght@400;700&display=swap' }
    ].forEach(f => {
      if (!document.getElementById(f.id)) {
        const link = document.createElement('link');
        link.id = f.id;
        link.rel = 'stylesheet';
        link.href = f.href;
        document.head.appendChild(link);
      }
    });
  }

  function injectStyles() {
    if (document.getElementById(PC.ids.baseStyle)) return;
    const style = document.createElement('style');
    style.id = PC.ids.baseStyle;
    style.textContent = `
      body.custom-sidebar-active #sidebar-v2 a[id].hide-before-pseudo::before { content:none!important; display:none!important; }
      body.custom-sidebar-active #sidebar-v2 .custom-sidebar-icon { object-fit:contain!important; flex:0 0 auto!important; margin-right:8px!important; }
      body.sidebar-icons-stacked #sidebar-v2 .custom-sidebar-icon { margin-right:0!important; margin-bottom:2px!important; }
      body.sidebar-icons-stacked #sidebar-v2 .hl_nav-header nav a[id],
      body.sidebar-icons-stacked #sidebar-v2 .hl_nav-header-without-footer nav a[id] { flex-direction:column!important; align-items:center!important; justify-content:center!important; padding-top:8px!important; padding-bottom:8px!important; max-height:none!important; }
      body.sidebar-icons-stacked #sidebar-v2 a[id] .nav-title { margin-top:2px!important; font-size:10px!important; text-align:center!important; }
      body.custom-sidebar-active .hl_nav-header > nav > div.divider:not([id^="custom-divider-"]),
      body.custom-sidebar-active .hl_nav-header-without-footer > nav > div.divider:not([id^="custom-divider-"]) { display:none!important; }

      #${PC.ids.mainButton} { cursor:pointer; }
      #${PC.ids.mainButton}.dragging { cursor:grabbing!important; }
      #${PC.ids.mainButton}:hover { box-shadow:0 4px 12px rgba(0,0,0,.2)!important; }

      .popup-overlay,.settings-popup-overlay,.icon-picker-overlay,.gbx-modal-overlay {
        position:fixed; inset:0; width:100%; height:100%; background:rgba(0,0,0,.5); z-index:2147483646;
      }
      .slide-in-popup { position:fixed; top:0; left:0; width:30vw; min-width:400px; max-width:560px; height:100vh; background:#fff; box-shadow:0 8px 30px rgba(0,0,0,.15); z-index:2147483647; display:flex; flex-direction:column; overflow:hidden; font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; transform:translateX(-100%); transition:transform .25s ease; }
      .popup-overlay.is-open { opacity:1; }
      .slide-in-popup.is-open { transform:translateX(0); }
      .draggable-component { display:grid; grid-template-columns:1fr auto; align-items:center; min-height:48px; padding:6px 15px; background:#f8f9fa; border:1px solid #dee2e6; border-radius:6px; cursor:grab; user-select:none; width:100%; box-sizing:border-box; margin-bottom:4px; gap:10px; }
      .draggable-component:hover { background:#e9ecef; }
      .draggable-component .component-name { font-weight:500; color:#374151; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
      .divider-component { text-align:center; color:#999; border-style:dashed; display:block; padding:10px; }
      #hidden-items-container .draggable-component { opacity:.62; }
      .component-controls { display:flex; align-items:center; gap:6px; }
      .component-controls button { font-size:13px; border:1px solid #d1d5db; background:#e5e7eb; border-radius:6px; padding:5px 8px; cursor:pointer; }
      .component-size-input { width:48px; padding:5px 6px; border-radius:6px; border:1px solid #d1d5db; text-align:center; }
      .popup-list-container { padding:10px 25px; height:100%; overflow-y:auto; }
      .popup-list-title-container { display:flex; justify-content:space-between; align-items:baseline; margin:15px 0 8px; border-bottom:1px solid #eee; padding-bottom:5px; }
      .drag-list { min-height:52px; border:1px dashed #ccc; border-radius:6px; padding:6px; }
      .popup-footer-controls { display:flex; flex-wrap:wrap; align-items:center; gap:15px; justify-content:space-around; width:100%; }
      .popup-save-button { background:#007bff; color:#fff; border:0; padding:10px 20px; border-radius:6px; cursor:pointer; font-size:16px; }

      .sub-menu-container { overflow:hidden; max-height:0; transition:all .25s ease-out; padding-top:0; padding-bottom:0; }
      .sub-menu-container.is-open { max-height:800px; padding-top:5px; padding-bottom:5px; }
      .sub-menu-link { display:block; padding:6px 10px 6px 40px; font-size:13px; color:#a0aec0; text-decoration:none; transition:background-color .2s,color .2s; cursor:pointer; }

      .settings-popup-content,.icon-picker-content,.gbx-modal-content {
        background:#fff; border-radius:12px; width:90%; max-width:560px; box-shadow:0 8px 30px rgba(0,0,0,.15); overflow:hidden; font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
      }
      .settings-popup-overlay,.icon-picker-overlay { display:flex; align-items:center; justify-content:center; }
      .settings-popup-header,.icon-picker-header { padding:15px 20px; border-bottom:1px solid #eee; display:flex; justify-content:space-between; align-items:center; }
      .settings-popup-body { padding:20px; max-height:60vh; overflow-y:auto; }
      .settings-popup-footer { padding:15px 20px; border-top:1px solid #eee; display:flex; justify-content:space-between; gap:10px; }
      .settings-popup-close-button,.icon-picker-close-btn { border:0; background:transparent; font-size:26px; cursor:pointer; color:#666; }
      .settings-fieldset { border:1px solid #ddd; border-radius:8px; padding:12px; margin-bottom:12px; }
      .settings-fieldset legend { font-weight:600; color:#333; font-size:14px; padding:0 8px; }
      .settings-form-row { display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; gap:10px; }
      .settings-button { padding:8px 16px; border-radius:6px; border:1px solid #ccc; cursor:pointer; font-size:14px; background:#f0f0f0; }
      .settings-button.save { background:#007bff; color:#fff; border:0; }

      .toggle-switch { position:relative; display:inline-block; width:40px; height:24px; flex-shrink:0; }
      .toggle-switch input { opacity:0; width:0; height:0; }
      .toggle-slider { position:absolute; cursor:pointer; inset:0; background:#ccc; transition:.25s; border-radius:24px; }
      .toggle-slider:before { position:absolute; content:""; height:16px; width:16px; left:4px; bottom:4px; background:#fff; transition:.25s; border-radius:50%; }
      input:checked + .toggle-slider { background:#007bff; }
      input:checked + .toggle-slider:before { transform:translateX(16px); }

      .icon-picker-custom-url-section { padding:1rem 1.5rem; border-bottom:1px solid #e5e7eb; display:flex; gap:10px; align-items:center; background:#f9fafb; }
      .icon-picker-custom-url-section input { flex:1; padding:8px 12px; border:1px solid #d1d5db; border-radius:6px; font-size:14px; }
      .icon-picker-custom-url-section button { padding:10px 14px; border:0; background:#007bff; color:#fff; border-radius:6px; cursor:pointer; font-weight:600; }
      .icon-picker-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(60px,1fr)); gap:8px; padding:15px; max-height:55vh; overflow:auto; }
      .icon-picker-item { padding:8px; border:1px solid #eee; border-radius:8px; cursor:pointer; display:flex; align-items:center; justify-content:center; }
      .icon-picker-item:hover { background:#eef6ff; border-color:#007bff; }
      .icon-picker-item img { width:36px; height:36px; object-fit:contain; }

      .gbx-sidebar { font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; }
      .gbx-dropdown { font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; }
    `;
    document.head.appendChild(style);
  }

  function updateDynamicStyles(settings) {
    const s = settings || currentAppearanceSettings || {};
    let styleTag = document.getElementById(PC.ids.dynamicStyle);
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = PC.ids.dynamicStyle;
      document.head.appendChild(styleTag);
    }

    let css = '';
    if (s.hoverColorEnabled && s.hoverColor) {
      css += `body.custom-sidebar-active #sidebar-v2 nav a:hover,body.custom-sidebar-active #sidebar-v2 nav a.active{background:${s.hoverColor}!important;}`;
    }
    if (s.textColorEnabled && s.textColor) {
      css += `body.custom-sidebar-active #sidebar-v2 nav a .nav-title{color:${s.textColor}!important;}`;
    }
    if (s.textSizeEnabled && s.textSize) {
      css += `body.custom-sidebar-active #sidebar-v2 nav a .nav-title{font-size:${parseInt(s.textSize, 10) || 14}px!important;}`;
    }
    if (s.textHoverColorEnabled && s.textHoverColor) {
      css += `body.custom-sidebar-active #sidebar-v2 nav a:hover .nav-title,body.custom-sidebar-active #sidebar-v2 nav a.active .nav-title{color:${s.textHoverColor}!important;}`;
    }
    if (s.subMenuTextColorEnabled && s.subMenuTextColor) {
      css += `body.custom-sidebar-active #sidebar-v2 .sub-menu-link{color:${s.subMenuTextColor}!important;}`;
    }
    if (s.subMenuTextSizeEnabled && s.subMenuTextSize) {
      css += `body.custom-sidebar-active #sidebar-v2 .sub-menu-link{font-size:${parseInt(s.subMenuTextSize, 10) || 13}px!important;}`;
    }
    styleTag.textContent = css;
  }

  // ===========================================================================
  // SIDEBAR CUSTOMIZATION
  // ===========================================================================
  function sidebarDefaults() {
    return {
      order: MAIN_NAV_COMPONENTS.map(c => c.id),
      stackIcons: false,
      enableSubMenus: true,
      subMenuTrigger: 'click'
    };
  }

  function discoverAndRegisterNavComponents() {
    const links = document.querySelectorAll('#sidebar-v2 .hl_nav-header > nav > a[id], #sidebar-v2 .hl_nav-header-without-footer > nav > a[id], .hl_nav-header > nav > a[id], .hl_nav-header-without-footer > nav > a[id]');
    links.forEach(link => {
      const id = link.id;
      const name = (link.querySelector('.nav-title') && link.querySelector('.nav-title').textContent.trim()) || link.textContent.trim();
      if (id && name && !MAIN_NAV_COMPONENTS.some(c => c.id === id)) {
        MAIN_NAV_COMPONENTS.push({ id, name });
      }
    });
  }

  function createCustomDividers() {
    const nav = getNavContainer();
    if (!nav) return;
    CUSTOM_DIVIDERS.forEach(d => {
      if (!document.getElementById(d.id)) {
        const divider = document.createElement('div');
        divider.id = d.id;
        divider.className = 'w-full group px-3 flex items-center justify-start text-sm font-medium rounded-md text-gray-300 font-normal cursor-text divider';
        divider.innerHTML = '<p class="w-full text-left border-b border-solid my-3" style="line-height:.1em;font-size:10px;"></p>';
        nav.appendChild(divider);
      }
    });
  }

  function restoreDefaultSidebar() {
    document.querySelectorAll('#sidebar-v2 a[id], #sidebar-v2 div.divider[id]').forEach(el => {
      el.style.removeProperty('display');
      el.style.removeProperty('order');
    });
    document.body.classList.remove('sidebar-icons-stacked', 'custom-sidebar-active');
    disableSubMenuSystem();
  }

  function restoreDefaultVisuals() {
    const sidebar = getSidebar();
    if (sidebar) sidebar.style.removeProperty('background');
    updateDynamicStyles({});

    const logoContainer = document.querySelector('.agency-logo-container');
    if (logoContainer) {
      const original = logoContainer.querySelector('.agency-logo');
      const custom = logoContainer.querySelector('img.custom-agency-logo');
      if (custom) custom.style.display = 'none';
      if (original) original.style.display = '';
    }

    document.querySelectorAll('#sidebar-v2 a[id] .nav-title').forEach(span => {
      const link = span.closest('a[id]');
      const comp = link ? MAIN_NAV_COMPONENTS.find(c => c.id === link.id) : null;
      if (comp) span.textContent = ` ${comp.name} `;
    });

    document.querySelectorAll('#sidebar-v2 a[id]').forEach(link => {
      const customIcon = link.querySelector('img.custom-sidebar-icon');
      if (customIcon) customIcon.remove();
      link.removeAttribute('data-icon-processed');
      link.classList.remove('hide-before-pseudo');
    });
  }

  function applySidebarSettings(settings) {
    const nav = getNavContainer();
    if (!nav || !settings) return;

    document.body.classList.add('custom-sidebar-active');
    nav.style.setProperty('display', 'flex', 'important');
    nav.style.setProperty('flex-direction', 'column', 'important');

    if (openSubMenu && openSubMenu.element) return;

    const validIds = new Set(settings.order || []);
    const children = Array.from(nav.querySelectorAll(':scope > [id]'));
    children.forEach(el => {
      if (validIds.has(el.id)) {
        el.style.setProperty('display', el.tagName.toLowerCase() === 'a' ? 'flex' : 'block', 'important');
        el.style.setProperty('order', String(settings.order.indexOf(el.id)), 'important');
      } else if (el.id && !el.id.startsWith('location-switcher')) {
        el.style.setProperty('display', 'none', 'important');
      }
    });

    settings.order.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.parentNode === nav && el.style.display !== 'none') {
        nav.appendChild(el);
        const next = el.nextElementSibling;
        if (next && next.classList.contains('sub-menu-container')) nav.appendChild(next);
      }
    });

    document.body.classList.toggle('sidebar-icons-stacked', !!settings.stackIcons);
    updateSubMenuSystem(settings);
  }

  async function loadAndApplySavedSettings() {
    const saved = await backend.get(PC.storage.sidebar);
    if (!saved) return;

    const settings = Object.assign(sidebarDefaults(), safeJsonParse(saved, {}));
    const valid = new Set([...MAIN_NAV_COMPONENTS.map(c => c.id), ...CUSTOM_DIVIDERS.map(c => c.id)]);
    settings.order = (settings.order || []).filter(id => valid.has(id));

    if (!settings.order.length) settings.order = sidebarDefaults().order;
    applySidebarSettings(settings);
  }

  function getButtonDefaultSettings() {
    return { top: '0', bottom: 'auto', left: '0', right: 'auto', bgColor: '#007bff', iconColor: '#ffffff', br_tl: '8', br_tr: '8', br_bl: '8', br_br: '8' };
  }

  function applyButtonStyles(settings) {
    const btn = document.getElementById(PC.ids.mainButton);
    if (!btn) return;
    const s = Object.assign(getButtonDefaultSettings(), settings || {});
    ['top', 'bottom', 'left', 'right'].forEach(prop => { btn.style[prop] = 'auto'; });
    if (s.top !== 'auto' && s.top !== '') btn.style.top = `${parseInt(s.top, 10) || 0}px`;
    if (s.bottom !== 'auto' && s.bottom !== '') btn.style.bottom = `${parseInt(s.bottom, 10) || 0}px`;
    if (s.left !== 'auto' && s.left !== '') btn.style.left = `${parseInt(s.left, 10) || 0}px`;
    if (s.right !== 'auto' && s.right !== '') btn.style.right = `${parseInt(s.right, 10) || 0}px`;
    btn.style.backgroundColor = s.bgColor || '#007bff';
    btn.style.borderRadius = `${parseInt(s.br_tl,10)||0}px ${parseInt(s.br_tr,10)||0}px ${parseInt(s.br_br,10)||0}px ${parseInt(s.br_bl,10)||0}px`;
    const svg = btn.querySelector('svg');
    if (svg) svg.style.fill = s.iconColor || '#fff';
  }

  async function loadAndApplyButtonSettings() {
    applyButtonStyles(Object.assign(getButtonDefaultSettings(), safeJsonParse(await backend.get(PC.storage.button), {})));
  }

  function getIconElement(navLink) {
    if (!navLink) return null;
    return navLink.querySelector('img.custom-sidebar-icon, img, svg, span.h-5, .h-5');
  }

  function ensureImageBasedIcon(navLink) {
    if (!navLink) return null;
    const existing = navLink.querySelector('img.custom-sidebar-icon');
    if (existing) return existing;

    const img = document.createElement('img');
    img.className = 'custom-sidebar-icon';
    img.alt = '';
    img.style.width = '24px';
    img.style.height = '24px';

    const replace = getIconElement(navLink);
    const title = navLink.querySelector('.nav-title');
    if (replace && replace.parentNode) replace.parentNode.replaceChild(img, replace);
    else if (title) navLink.insertBefore(img, title);
    else navLink.insertBefore(img, navLink.firstChild);

    navLink.setAttribute('data-icon-processed', 'true');
    navLink.classList.add('hide-before-pseudo');
    return img;
  }

  function applyIconStyles() {
    Object.keys(currentIconSettings || {}).forEach(id => {
      const link = document.getElementById(id);
      if (!link) return;
      const s = currentIconSettings[id] || {};
      let icon;
      if (s.name) {
        icon = ensureImageBasedIcon(link);
        if (icon) icon.src = /^https?:\/\//i.test(s.name) ? s.name : PC.iconBaseUrl + s.name;
      } else {
        icon = getIconElement(link);
      }
      if (icon && s.size) {
        icon.style.width = `${parseInt(s.size, 10) || 24}px`;
        icon.style.height = `${parseInt(s.size, 10) || 24}px`;
      }
    });
  }

  async function loadAndApplyIconSettings() {
    const saved = await backend.get(PC.storage.icons);
    currentIconSettings = safeJsonParse(saved, {});
    if (!saved) {
      document.querySelectorAll('img.custom-sidebar-icon').forEach(img => img.remove());
      document.querySelectorAll('#sidebar-v2 a[id]').forEach(link => {
        link.removeAttribute('data-icon-processed');
        link.classList.remove('hide-before-pseudo');
      });
    }
    applyIconStyles();
  }

  async function saveIconStyle(id, key, value) {
    if (!currentIconSettings[id]) currentIconSettings[id] = {};
    currentIconSettings[id][key] = value;
    await backend.set(PC.storage.icons, JSON.stringify(currentIconSettings));
  }

  function applyRenames() {
    Object.keys(currentRenameSettings || {}).forEach(id => {
      const link = document.getElementById(id);
      const title = link && link.querySelector('.nav-title');
      const name = currentRenameSettings[id];
      if (title && name) title.textContent = ` ${name} `;
    });
  }

  async function loadAndApplyRenameSettings() {
    const saved = await backend.get(PC.storage.renames);
    currentRenameSettings = safeJsonParse(saved, {});
    if (!saved) {
      document.querySelectorAll('#sidebar-v2 a[id] .nav-title').forEach(span => {
        const link = span.closest('a[id]');
        const comp = link ? MAIN_NAV_COMPONENTS.find(c => c.id === link.id) : null;
        if (comp) span.textContent = ` ${comp.name} `;
      });
    }
    applyRenames();
  }

  async function saveRename(id, name) {
    if (name && name.trim()) currentRenameSettings[id] = name.trim();
    else delete currentRenameSettings[id];
    await backend.set(PC.storage.renames, JSON.stringify(currentRenameSettings));
  }

  function applyBackground(settings) {
    const sidebar = getSidebar();
    if (!sidebar) return;
    const s = settings || {};
    if (!s.type || s.type === 'default') {
      sidebar.style.removeProperty('background');
      return;
    }
    const bg = s.type === 'gradient'
      ? `linear-gradient(${parseInt(s.angle, 10) || 90}deg, ${s.color1 || '#fff'}, ${s.color2 || '#f0f0f0'})`
      : (s.color1 || '#fff');
    sidebar.style.setProperty('background', bg, 'important');
  }

  async function loadAndApplyAppearanceSettings() {
    const saved = await backend.get(PC.storage.appearance);
    currentAppearanceSettings = safeJsonParse(saved, {});
    if (!saved) {
      applyBackground(null);
      updateDynamicStyles({});
    } else {
      applyBackground(currentAppearanceSettings.background);
      updateDynamicStyles(currentAppearanceSettings);
    }
  }

  async function applyLogo() {
    if (!PC.enableLogoCustomization) return;
    const container = document.querySelector('.agency-logo-container');
    if (!container) return;

    const url = await backend.get(PC.storage.logoUrl);
    const height = await backend.get(PC.storage.logoHeight) || '40';
    const original = container.querySelector('.agency-logo');
    let custom = container.querySelector('img.custom-agency-logo');

    if (url && String(url).trim()) {
      if (!custom) {
        custom = document.createElement('img');
        custom.className = 'custom-agency-logo';
        custom.style.maxWidth = '100%';
        custom.style.objectFit = 'contain';
        container.appendChild(custom);
      }
      custom.src = String(url).trim();
      custom.style.maxHeight = `${parseInt(height, 10) || 40}px`;
      custom.style.display = '';
      if (original) original.style.display = 'none';
    } else {
      if (custom) custom.style.display = 'none';
      if (original) original.style.display = '';
    }
  }

  // ===========================================================================
  // SUBMENU SYSTEM
  // ===========================================================================
  function closeOpenSubMenu() {
    if (openSubMenu.element) {
      const el = openSubMenu.element;
      el.classList.remove('is-open');
      setTimeout(() => { if (el && el.parentNode) el.remove(); }, 260);
    }
    openSubMenu = { parent: null, element: null };
  }

  function waitForElementAndClick(id, maxRetries, interval) {
    let tries = 0;
    const timer = setInterval(() => {
      const el = document.getElementById(id);
      if (el) {
        el.click();
        clearInterval(timer);
      } else if (++tries >= (maxRetries || 50)) {
        clearInterval(timer);
      }
    }, interval || 100);
  }

  function openSubMenuFor(link) {
    if (!link || !subMenuConfig[link.id] || !subMenuConfig[link.id].length) return;
    if (closeSubMenuTimer) clearTimeout(closeSubMenuTimer);
    if (openSubMenu.parent === link) return;
    closeOpenSubMenu();

    const box = document.createElement('div');
    box.className = 'sub-menu-container';
    if (link.style.order) box.style.order = link.style.order;

    subMenuConfig[link.id].forEach(item => {
      const a = document.createElement('a');
      a.href = '#';
      a.className = 'sub-menu-link';
      a.textContent = item.text;
      a.addEventListener('click', e => {
        e.preventDefault();
        link.click();
        if (item.clickId) waitForElementAndClick(item.clickId);
        closeOpenSubMenu();
      });
      box.appendChild(a);
    });

    link.insertAdjacentElement('afterend', box);
    openSubMenu = { parent: link, element: box };
    setTimeout(() => box.classList.add('is-open'), 10);
  }

  function handleSidebarMouseOver(e) {
    const link = e.target.closest('a[id]');
    if (link && subMenuConfig[link.id]) openSubMenuFor(link);
    else if (e.target.closest('.sub-menu-container') && closeSubMenuTimer) clearTimeout(closeSubMenuTimer);
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
    if (!e.target.closest('#sidebar-v2,.lead-connector,.sub-menu-container')) closeOpenSubMenu();
  }

  function updateSubMenuSystem(settings) {
    const sidebar = getSidebar();
    if (!sidebar) return;
    sidebar.removeEventListener('mouseover', handleSidebarMouseOver);
    sidebar.removeEventListener('mouseout', handleSidebarMouseOut);
    sidebar.removeEventListener('contextmenu', handleSidebarContextMenu);
    document.removeEventListener('click', handleGlobalClick);

    if (!settings || !settings.enableSubMenus) {
      closeOpenSubMenu();
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

  // ===========================================================================
  // POPUP BUILDERS
  // ===========================================================================
  function createPopupShell(titleText) {
    const overlay = document.createElement('div');
    overlay.className = 'settings-popup-overlay';
    const content = document.createElement('div');
    content.className = 'settings-popup-content';
    content.innerHTML = `
      <div class="settings-popup-header"><h3 style="margin:0;font-size:18px;">${titleText}</h3><button class="settings-popup-close-button">&times;</button></div>
      <div class="settings-popup-body"></div>
      <div class="settings-popup-footer"></div>
    `;
    overlay.appendChild(content);
    document.body.appendChild(overlay);
    const close = () => overlay.remove();
    content.querySelector('.settings-popup-close-button').onclick = close;
    overlay.onclick = e => { if (e.target === overlay) close(); };
    return { overlay, content, body: content.querySelector('.settings-popup-body'), footer: content.querySelector('.settings-popup-footer'), close };
  }

  async function createBackgroundPopup() {
    if (document.querySelector('.settings-popup-overlay')) return;

    const defaults = {
      background: { type: 'default', color1: '#ffffff', color2: '#f0f0f0', angle: 90 },
      hoverColor: '#e5e7eb', hoverColorEnabled: true,
      textColor: '#374151', textColorEnabled: true,
      textHoverColor: '#000000', textHoverColorEnabled: true,
      textSize: '14', textSizeEnabled: true,
      subMenuTextColor: '#a0aec0', subMenuTextColorEnabled: true,
      subMenuTextSize: '13', subMenuTextSizeEnabled: true
    };
    currentAppearanceSettings = Object.assign({}, defaults, currentAppearanceSettings || {}, {
      background: Object.assign({}, defaults.background, (currentAppearanceSettings || {}).background || {})
    });

    const p = createPopupShell('Customize Appearance');
    p.body.innerHTML = `
      <fieldset class="settings-fieldset"><legend>Background Type</legend>
        <div class="settings-form-row" style="justify-content:space-around;">
          <label><input type="radio" name="bg-type" value="default" ${currentAppearanceSettings.background.type === 'default' ? 'checked' : ''}> Default</label>
          <label><input type="radio" name="bg-type" value="solid" ${currentAppearanceSettings.background.type === 'solid' ? 'checked' : ''}> Solid</label>
          <label><input type="radio" name="bg-type" value="gradient" ${currentAppearanceSettings.background.type === 'gradient' ? 'checked' : ''}> Gradient</label>
        </div>
      </fieldset>
      <div id="solid-color-section"><fieldset class="settings-fieldset"><legend>Solid Color</legend><div class="settings-form-row"><label>Color</label><input type="color" id="bg-color1" value="${currentAppearanceSettings.background.color1}"></div></fieldset></div>
      <div id="gradient-color-section"><fieldset class="settings-fieldset"><legend>Gradient</legend><div class="settings-form-row"><label>Color 1</label><input type="color" id="bg-color-grad1" value="${currentAppearanceSettings.background.color1}"></div><div class="settings-form-row"><label>Color 2</label><input type="color" id="bg-color-grad2" value="${currentAppearanceSettings.background.color2}"></div><div class="settings-form-row"><label>Angle</label><input type="number" id="bg-angle" min="0" max="360" value="${currentAppearanceSettings.background.angle}" style="width:70px;"></div></fieldset></div>
      <fieldset class="settings-fieldset"><legend>Hover Background</legend><div class="settings-form-row"><label style="display:flex;gap:10px;align-items:center;"><label class="toggle-switch"><input type="checkbox" id="bg-hover-color-toggle" ${currentAppearanceSettings.hoverColorEnabled ? 'checked' : ''}><span class="toggle-slider"></span></label><span>Hover & Active Color</span></label><input type="color" id="bg-hover-color" value="${currentAppearanceSettings.hoverColor}"></div></fieldset>
      <fieldset class="settings-fieldset"><legend>Text</legend>
        <div class="settings-form-row"><label style="display:flex;gap:10px;align-items:center;"><label class="toggle-switch"><input type="checkbox" id="global-text-color-toggle" ${currentAppearanceSettings.textColorEnabled ? 'checked' : ''}><span class="toggle-slider"></span></label><span>Text Color</span></label><input type="color" id="global-text-color" value="${currentAppearanceSettings.textColor}"></div>
        <div class="settings-form-row"><label style="display:flex;gap:10px;align-items:center;"><label class="toggle-switch"><input type="checkbox" id="global-text-hover-color-toggle" ${currentAppearanceSettings.textHoverColorEnabled ? 'checked' : ''}><span class="toggle-slider"></span></label><span>Hover Text Color</span></label><input type="color" id="global-text-hover-color" value="${currentAppearanceSettings.textHoverColor}"></div>
        <div class="settings-form-row"><label style="display:flex;gap:10px;align-items:center;"><label class="toggle-switch"><input type="checkbox" id="global-text-size-toggle" ${currentAppearanceSettings.textSizeEnabled ? 'checked' : ''}><span class="toggle-slider"></span></label><span>Text Size</span></label><input type="number" id="global-text-size" min="8" max="24" value="${currentAppearanceSettings.textSize}" style="width:70px;"></div>
      </fieldset>
      <fieldset class="settings-fieldset"><legend>Sub-Menu Text</legend>
        <div class="settings-form-row"><label style="display:flex;gap:10px;align-items:center;"><label class="toggle-switch"><input type="checkbox" id="submenu-text-color-toggle" ${currentAppearanceSettings.subMenuTextColorEnabled ? 'checked' : ''}><span class="toggle-slider"></span></label><span>Color</span></label><input type="color" id="submenu-text-color" value="${currentAppearanceSettings.subMenuTextColor}"></div>
        <div class="settings-form-row"><label style="display:flex;gap:10px;align-items:center;"><label class="toggle-switch"><input type="checkbox" id="submenu-text-size-toggle" ${currentAppearanceSettings.subMenuTextSizeEnabled ? 'checked' : ''}><span class="toggle-slider"></span></label><span>Size</span></label><input type="number" id="submenu-text-size" min="8" max="24" value="${currentAppearanceSettings.subMenuTextSize}" style="width:70px;"></div>
      </fieldset>
    `;
    p.footer.innerHTML = '<button id="remove-appearance-btn" class="settings-button">Reset Appearance</button><button id="save-appearance-btn" class="settings-button save">Save</button>';

    const getSettings = () => {
      const type = (p.body.querySelector('input[name="bg-type"]:checked') || {}).value || 'default';
      let bg = { type: 'default' };
      if (type === 'solid') bg = { type: 'solid', color1: p.body.querySelector('#bg-color1').value };
      if (type === 'gradient') bg = { type: 'gradient', color1: p.body.querySelector('#bg-color-grad1').value, color2: p.body.querySelector('#bg-color-grad2').value, angle: p.body.querySelector('#bg-angle').value };
      return {
        background: bg,
        hoverColor: p.body.querySelector('#bg-hover-color').value,
        hoverColorEnabled: p.body.querySelector('#bg-hover-color-toggle').checked,
        textColor: p.body.querySelector('#global-text-color').value,
        textColorEnabled: p.body.querySelector('#global-text-color-toggle').checked,
        textHoverColor: p.body.querySelector('#global-text-hover-color').value,
        textHoverColorEnabled: p.body.querySelector('#global-text-hover-color-toggle').checked,
        textSize: p.body.querySelector('#global-text-size').value,
        textSizeEnabled: p.body.querySelector('#global-text-size-toggle').checked,
        subMenuTextColor: p.body.querySelector('#submenu-text-color').value,
        subMenuTextColorEnabled: p.body.querySelector('#submenu-text-color-toggle').checked,
        subMenuTextSize: p.body.querySelector('#submenu-text-size').value,
        subMenuTextSizeEnabled: p.body.querySelector('#submenu-text-size-toggle').checked
      };
    };

    const updateUI = () => {
      const type = (p.body.querySelector('input[name="bg-type"]:checked') || {}).value || 'default';
      p.body.querySelector('#solid-color-section').style.display = type === 'solid' ? 'block' : 'none';
      p.body.querySelector('#gradient-color-section').style.display = type === 'gradient' ? 'block' : 'none';
    };
    const preview = () => {
      const s = getSettings();
      applyBackground(s.background);
      updateDynamicStyles(s);
    };

    p.body.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', preview);
      input.addEventListener('change', () => { updateUI(); preview(); });
    });
    updateUI();

    p.footer.querySelector('#save-appearance-btn').onclick = async () => {
      currentAppearanceSettings = getSettings();
      await backend.set(PC.storage.appearance, JSON.stringify(currentAppearanceSettings));
      preview();
      p.close();
    };
    p.footer.querySelector('#remove-appearance-btn').onclick = async () => {
      currentAppearanceSettings = {};
      await backend.remove(PC.storage.appearance);
      applyBackground(null);
      updateDynamicStyles({});
      p.close();
    };
  }

  async function createLogoPopup() {
    if (!PC.enableLogoCustomization || document.querySelector('.settings-popup-overlay')) return;
    const url = await backend.get(PC.storage.logoUrl) || '';
    const height = await backend.get(PC.storage.logoHeight) || '40';
    const p = createPopupShell('Customize Agency Logo');
    p.body.innerHTML = `
      <label style="display:block;margin-bottom:8px;">Logo Image URL</label>
      <input type="text" id="logo-url-input" placeholder="https://..." value="${String(url).replace(/"/g, '&quot;')}" style="width:100%;padding:8px;border:1px solid #ccc;border-radius:4px;margin-bottom:15px;box-sizing:border-box;">
      <label style="display:block;margin-bottom:8px;">Logo Height (px)</label>
      <input type="number" id="logo-height-input" value="${String(height).replace(/"/g, '&quot;')}" style="width:100%;padding:8px;border:1px solid #ccc;border-radius:4px;box-sizing:border-box;">
    `;
    p.footer.innerHTML = '<button id="remove-logo-btn" class="settings-button">Remove Custom Logo</button><button id="save-logo-btn" class="settings-button save">Save</button>';
    p.footer.querySelector('#save-logo-btn').onclick = async () => {
      await backend.set(PC.storage.logoUrl, p.body.querySelector('#logo-url-input').value.trim());
      await backend.set(PC.storage.logoHeight, p.body.querySelector('#logo-height-input').value.trim() || '40');
      await applyLogo();
      p.close();
    };
    p.footer.querySelector('#remove-logo-btn').onclick = async () => {
      await backend.remove(PC.storage.logoUrl);
      await backend.remove(PC.storage.logoHeight);
      await applyLogo();
      p.close();
    };
  }

  async function createRenamePopup(navId) {
    if (document.querySelector('.settings-popup-overlay')) return;
    const link = document.getElementById(navId);
    if (!link) return;
    const comp = MAIN_NAV_COMPONENTS.find(c => c.id === navId);
    const defaultName = comp ? comp.name : navId;
    const current = currentRenameSettings[navId] || (link.querySelector('.nav-title') ? link.querySelector('.nav-title').textContent.trim() : defaultName);
    const p = createPopupShell('Rename Menu Item');
    p.body.innerHTML = `<label style="display:block;margin-bottom:8px;">New Name for "${defaultName}"</label><input id="rename-input" type="text" value="${String(current).replace(/"/g, '&quot;')}" style="width:100%;padding:9px 12px;border:1px solid #ccc;border-radius:6px;box-sizing:border-box;">`;
    p.footer.innerHTML = '<button id="reset-rename-btn" class="settings-button">Reset</button><button id="save-rename-btn" class="settings-button save">Save Name</button>';
    const input = p.body.querySelector('#rename-input');
    setTimeout(() => { input.focus(); input.select(); }, 10);
    const applyUI = name => {
      const title = link.querySelector('.nav-title');
      if (title) title.textContent = ` ${name} `;
      const compItem = document.querySelector(`.draggable-component[data-id="${CSS.escape(navId)}"] .component-name`);
      if (compItem) compItem.textContent = name;
    };
    p.footer.querySelector('#save-rename-btn').onclick = async () => {
      const name = input.value.trim();
      await saveRename(navId, name);
      applyUI(name || defaultName);
      p.close();
    };
    p.footer.querySelector('#reset-rename-btn').onclick = async () => {
      await saveRename(navId, '');
      applyUI(defaultName);
      p.close();
    };
  }

  async function createButtonSettingsPopup() {
    if (document.querySelector('.settings-popup-overlay')) return;
    const current = Object.assign(getButtonDefaultSettings(), safeJsonParse(await backend.get(PC.storage.button), {}));
    const p = createPopupShell('Button Settings');
    p.body.innerHTML = `
      <form id="button-settings-form">
        <fieldset class="settings-fieldset"><legend>Button Position (px)</legend>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div class="settings-form-row"><label>Top</label><input type="number" id="pos_top" value="${current.top === 'auto' ? '' : current.top}" style="width:80px;"></div>
            <div class="settings-form-row"><label>Bottom</label><input type="number" id="pos_bottom" value="${current.bottom === 'auto' ? '' : current.bottom}" style="width:80px;"></div>
            <div class="settings-form-row"><label>Left</label><input type="number" id="pos_left" value="${current.left === 'auto' ? '' : current.left}" style="width:80px;"></div>
            <div class="settings-form-row"><label>Right</label><input type="number" id="pos_right" value="${current.right === 'auto' ? '' : current.right}" style="width:80px;"></div>
          </div>
        </fieldset>
        <fieldset class="settings-fieldset"><legend>Border Radius</legend>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div class="settings-form-row"><label>Top Left</label><input type="number" id="br_tl" min="0" value="${current.br_tl}" style="width:70px;"></div>
            <div class="settings-form-row"><label>Top Right</label><input type="number" id="br_tr" min="0" value="${current.br_tr}" style="width:70px;"></div>
            <div class="settings-form-row"><label>Bottom Left</label><input type="number" id="br_bl" min="0" value="${current.br_bl}" style="width:70px;"></div>
            <div class="settings-form-row"><label>Bottom Right</label><input type="number" id="br_br" min="0" value="${current.br_br}" style="width:70px;"></div>
          </div>
        </fieldset>
        <fieldset class="settings-fieldset"><legend>Colors</legend>
          <div class="settings-form-row"><label>Background</label><input type="color" id="bgColor" value="${current.bgColor}"></div>
          <div class="settings-form-row"><label>Icon</label><input type="color" id="iconColor" value="${current.iconColor}"></div>
        </fieldset>
      </form>
    `;
    p.footer.innerHTML = '<button id="reset-btn" class="settings-button">Reset</button><button id="save-btn" class="settings-button save">Save</button>';
    const form = p.body.querySelector('#button-settings-form');
    const read = () => ({
      top: form.querySelector('#pos_top').value || 'auto',
      bottom: form.querySelector('#pos_bottom').value || 'auto',
      left: form.querySelector('#pos_left').value || 'auto',
      right: form.querySelector('#pos_right').value || 'auto',
      br_tl: form.querySelector('#br_tl').value || '0',
      br_tr: form.querySelector('#br_tr').value || '0',
      br_bl: form.querySelector('#br_bl').value || '0',
      br_br: form.querySelector('#br_br').value || '0',
      bgColor: form.querySelector('#bgColor').value,
      iconColor: form.querySelector('#iconColor').value
    });
    form.addEventListener('input', () => applyButtonStyles(read()));
    p.footer.querySelector('#save-btn').onclick = async () => {
      await backend.set(PC.storage.button, JSON.stringify(read()));
      p.close();
    };
    p.footer.querySelector('#reset-btn').onclick = async () => {
      await backend.remove(PC.storage.button);
      applyButtonStyles(getButtonDefaultSettings());
      p.close();
    };
  }

  async function createIconPicker(navId) {
    const link = document.getElementById(navId);
    if (!link) return;
    ensureImageBasedIcon(link);

    document.querySelectorAll('.icon-picker-overlay').forEach(e => e.remove());
    const overlay = document.createElement('div');
    overlay.className = 'icon-picker-overlay';
    const picker = document.createElement('div');
    picker.className = 'icon-picker-content';
    picker.innerHTML = `
      <div class="icon-picker-header"><h4 style="margin:0;">Select an Icon</h4><button class="icon-picker-close-btn">&times;</button></div>
      <div class="icon-picker-custom-url-section"><input type="text" id="custom-icon-url-input" placeholder="Or paste an image URL here..."><button id="custom-icon-save-btn">Save</button></div>
      <div class="icon-picker-grid">${iconList.map(name => `<div class="icon-picker-item" data-icon-name="${name}" title="${name}"><img src="${PC.iconBaseUrl + name}" alt=""></div>`).join('')}</div>
    `;
    overlay.appendChild(picker);
    document.body.appendChild(overlay);

    const close = () => overlay.remove();
    picker.querySelector('.icon-picker-close-btn').onclick = close;
    overlay.onclick = e => { if (e.target === overlay) close(); };
    picker.querySelector('.icon-picker-grid').onclick = async e => {
      const item = e.target.closest('.icon-picker-item');
      if (!item) return;
      await saveIconStyle(navId, 'name', item.dataset.iconName);
      applyIconStyles();
      close();
    };
    picker.querySelector('#custom-icon-save-btn').onclick = async () => {
      const url = picker.querySelector('#custom-icon-url-input').value.trim();
      if (!url) return showAlert('Please enter a valid image URL.');
      await saveIconStyle(navId, 'name', url);
      applyIconStyles();
      close();
    };
  }

  function createDraggableComponent(id, name) {
    const div = document.createElement('div');
    div.dataset.id = id;
    div.className = 'draggable-component';
    div.draggable = true;

    if (id.includes('divider')) {
      div.classList.add('divider-component');
      div.textContent = '--- Divider ---';
    } else {
      const s = currentIconSettings[id] || {};
      div.innerHTML = `
        <span class="component-name">${name}</span>
        <div class="component-controls">
          <button class="component-rename-button" title="Rename">Rename</button>
          <button class="component-icon-button" title="Change Icon">Icon</button>
          <input type="number" class="component-size-input" value="${s.size || '24'}" min="10" max="60" title="Icon Size">
        </div>
      `;
    }

    div.addEventListener('dragstart', e => {
      isDragging = true;
      draggedItem = e.target.closest('.draggable-component');
      if (draggedItem) {
        draggedItem.style.opacity = '.5';
        draggedItem.style.cursor = 'grabbing';
      }
    });
    div.addEventListener('dragend', () => {
      isDragging = false;
      if (draggedItem) {
        draggedItem.style.opacity = '1';
        draggedItem.style.cursor = 'grab';
      }
      draggedItem = null;
    });
    return div;
  }

  function getDragAfterElement(container, y) {
    const els = Array.from(container.querySelectorAll('.draggable-component:not([style*="opacity: 0.5"])'));
    return els.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) return { offset, element: child };
      return closest;
    }, { offset: Number.NEGATIVE_INFINITY, element: null }).element;
  }

  async function saveSidebarPopupSettings(popup) {
    const ids = Array.from(popup.querySelectorAll('#visible-items-container .draggable-component')).map(c => c.dataset.id);
    const settings = {
      order: ids,
      stackIcons: !!popup.querySelector('#stack-icons-checkbox').checked,
      enableSubMenus: !!popup.querySelector('#enable-submenus-checkbox').checked,
      subMenuTrigger: (popup.querySelector('input[name="submenu-trigger"]:checked') || {}).value || 'click'
    };
    await backend.set(PC.storage.sidebar, JSON.stringify(settings));
    applySidebarSettings(settings);
    const overlay = popup.closest('.popup-overlay');
    if (overlay) overlay.remove();
  }

  async function createImportExportPopup() {
    if (document.querySelector('.settings-popup-overlay')) return;
    const keys = [PC.storage.sidebar, PC.storage.button, PC.storage.icons, PC.storage.renames, PC.storage.logoUrl, PC.storage.logoHeight, PC.storage.appearance];
    const settings = {};
    for (const k of keys) settings[k] = await backend.get(k);

    const p = createPopupShell('Import / Export Settings');
    p.body.innerHTML = `
      <h4>Export Current Settings</h4>
      <textarea id="export-textarea" readonly style="width:100%;height:170px;font-family:monospace;font-size:12px;padding:10px;box-sizing:border-box;margin-bottom:10px;">${JSON.stringify(settings, null, 2)}</textarea>
      <button id="copy-export-btn" class="settings-button">Copy to Clipboard</button>
      <h4>Import Settings</h4>
      <textarea id="import-textarea" placeholder="Paste settings JSON here..." style="width:100%;height:170px;font-family:monospace;font-size:12px;padding:10px;box-sizing:border-box;"></textarea>
    `;
    p.footer.innerHTML = '<button id="import-settings-btn" class="settings-button save">Import and Reload</button>';
    p.body.querySelector('#copy-export-btn').onclick = () => navigator.clipboard.writeText(p.body.querySelector('#export-textarea').value).then(() => showAlert('Settings copied.'));
    p.footer.querySelector('#import-settings-btn').onclick = async () => {
      const raw = p.body.querySelector('#import-textarea').value.trim();
      if (!raw) return showAlert('Import field is empty.');
      try {
        const imported = JSON.parse(raw);
        if (!window.confirm('Overwrite current settings and reload?')) return;
        for (const k of keys) {
          if (Object.prototype.hasOwnProperty.call(imported, k)) await backend.set(k, imported[k]);
        }
        location.reload();
      } catch (e) {
        showAlert('Invalid JSON.');
      }
    };
  }

  async function createSidebarCustomizerPopup() {
    if (document.querySelector('.slide-in-popup')) return;
    discoverAndRegisterNavComponents();

    const all = [...MAIN_NAV_COMPONENTS, ...CUSTOM_DIVIDERS];
    const saved = safeJsonParse(await backend.get(PC.storage.sidebar), {});
    const settings = Object.assign(sidebarDefaults(), saved);
    const visibleIds = new Set(settings.order || []);

    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    const popup = document.createElement('div');
    popup.id = PC.ids.popup;
    popup.className = 'slide-in-popup';

    popup.innerHTML = `
      <div style="padding:15px 25px;border-bottom:1px solid #e0e0e0;display:flex;justify-content:space-between;align-items:center;flex-shrink:0;">
        <h3 style="margin:0;font-size:18px;color:#333;">Customize Navigation</h3>
        <div class="gbx-popup-controls" style="display:flex;align-items:center;gap:8px;">
          <button id="gbx-appearance-btn" title="Customize Appearance">🎨</button>
          <button id="gbx-logo-btn" title="Customize Logo">🖼️</button>
          <button id="gbx-import-export-btn" title="Import / Export">↔️</button>
          <button id="gbx-standard-btn" title="Apply Standard Settings">⭐</button>
          <button id="gbx-reset-btn" title="Reset All">↻</button>
          <button id="gbx-button-settings-btn" title="Floating Button Settings">⚙️</button>
          <button id="gbx-close-popup-btn" style="font-size:30px;line-height:1;color:#888;">×</button>
        </div>
      </div>
      <div class="popup-list-container">
        <div class="popup-list-title-container"><h4>Visible Menu Items</h4><div class="component-key"></div></div>
        <div id="visible-items-container" class="drag-list"></div>
        <h4>Hidden Menu Items</h4>
        <div id="hidden-items-container" class="drag-list"></div>
      </div>
      <div style="padding:15px 25px;border-top:1px solid #e0e0e0;display:flex;justify-content:space-between;align-items:center;flex-shrink:0;flex-wrap:wrap;gap:10px;">
        <div class="popup-footer-controls">
          <label><input type="checkbox" id="stack-icons-checkbox" ${settings.stackIcons ? 'checked' : ''}> Stack Icons</label>
          <label><input type="checkbox" id="enable-submenus-checkbox" ${settings.enableSubMenus ? 'checked' : ''}> Dropdowns</label>
          <div style="display:flex;gap:10px;border-left:1px solid #ccc;padding-left:15px;">
            <label><input type="radio" name="submenu-trigger" value="hover" ${settings.subMenuTrigger === 'hover' ? 'checked' : ''}> Hover</label>
            <label><input type="radio" name="submenu-trigger" value="click" ${settings.subMenuTrigger !== 'hover' ? 'checked' : ''}> R-Click</label>
          </div>
        </div>
        <button class="popup-save-button" id="gbx-save-sidebar-btn">Save Changes</button>
      </div>
    `;

    popup.querySelectorAll('.gbx-popup-controls button').forEach(b => {
      b.style.cssText = 'background:transparent;border:0;cursor:pointer;padding:5px;border-radius:50%;font-size:20px;display:flex;align-items:center;justify-content:center;';
    });

    const visible = popup.querySelector('#visible-items-container');
    const hidden = popup.querySelector('#hidden-items-container');
    const sortedVisible = all.filter(c => visibleIds.has(c.id)).sort((a, b) => (settings.order || []).indexOf(a.id) - (settings.order || []).indexOf(b.id));
    const sortedHidden = all.filter(c => !visibleIds.has(c.id));

    sortedVisible.forEach(c => visible.appendChild(createDraggableComponent(c.id, currentRenameSettings[c.id] || c.name)));
    sortedHidden.forEach(c => hidden.appendChild(createDraggableComponent(c.id, currentRenameSettings[c.id] || c.name)));

    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    setTimeout(() => { overlay.classList.add('is-open'); popup.classList.add('is-open'); }, 10);

    const close = () => overlay.remove();
    popup.querySelector('#gbx-close-popup-btn').onclick = close;
    overlay.onclick = e => { if (e.target === overlay) close(); };
    popup.querySelector('#gbx-appearance-btn').onclick = createBackgroundPopup;
    popup.querySelector('#gbx-logo-btn').onclick = createLogoPopup;
    popup.querySelector('#gbx-import-export-btn').onclick = createImportExportPopup;
    popup.querySelector('#gbx-button-settings-btn').onclick = createButtonSettingsPopup;
    popup.querySelector('#gbx-save-sidebar-btn').onclick = () => saveSidebarPopupSettings(popup);

    popup.querySelector('#gbx-standard-btn').onclick = async () => {
      if (!window.confirm('Apply standard settings? This overwrites icon and layout settings.')) return;
      const current = safeJsonParse(await backend.get(PC.storage.sidebar), {});
      await backend.set(PC.storage.sidebar, JSON.stringify(Object.assign({}, current, { stackIcons: true, enableSubMenus: true })));
      const icons = safeJsonParse(await backend.get(PC.storage.icons), {});
      MAIN_NAV_COMPONENTS.forEach(c => {
        if (standardIconSettings[c.id]) icons[c.id] = Object.assign({}, icons[c.id] || {}, { name: standardIconSettings[c.id], size: '30' });
      });
      await backend.set(PC.storage.icons, JSON.stringify(icons));
      location.reload();
    };

    popup.querySelector('#gbx-reset-btn').onclick = async () => {
      if (!window.confirm('Reset all sidebar/button/logo settings? This cannot be undone.')) return;
      await Promise.all([PC.storage.sidebar, PC.storage.button, PC.storage.icons, PC.storage.renames, PC.storage.appearance, PC.storage.colors, PC.storage.logoUrl, PC.storage.logoHeight].map(k => backend.remove(k)));
      location.reload();
    };

    [visible, hidden].forEach(list => {
      list.addEventListener('dragover', e => {
        e.preventDefault();
        if (!draggedItem) return;
        const after = getDragAfterElement(list, e.clientY);
        if (after == null) list.appendChild(draggedItem);
        else list.insertBefore(draggedItem, after);
      });
    });

    popup.querySelector('.popup-list-container').addEventListener('click', e => {
      const btn = e.target.closest('button');
      if (!btn) return;
      const comp = btn.closest('.draggable-component');
      if (!comp) return;
      if (btn.classList.contains('component-icon-button')) createIconPicker(comp.dataset.id);
      if (btn.classList.contains('component-rename-button')) createRenamePopup(comp.dataset.id);
    });

    popup.querySelector('.popup-list-container').addEventListener('input', async e => {
      if (!e.target.classList.contains('component-size-input')) return;
      const comp = e.target.closest('.draggable-component');
      if (!comp) return;
      await saveIconStyle(comp.dataset.id, 'size', e.target.value);
      applyIconStyles();
    });
  }

  // ===========================================================================
  // FLOATING BUTTONS
  // ===========================================================================
  function createAndAppendButton() {
    if (document.getElementById(PC.ids.mainButton)) return;
    const b = document.createElement('button');
    b.id = PC.ids.mainButton;
    b.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>';
    Object.assign(b.style, {
      position: 'fixed', width: '36px', height: '36px', zIndex: '2147483645', border: 'none',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,.15)', transition: 'background-color .2s,box-shadow .2s,border-radius .2s'
    });
    document.body.appendChild(b);

    let pressTimer = null;
    let wasDragged = false;
    let offsetX = 0;
    let offsetY = 0;

    const move = e => {
      if (!isDraggingButton) return;
      wasDragged = true;
      const rect = b.getBoundingClientRect();
      let left = Math.max(0, Math.min(e.clientX - offsetX, window.innerWidth - rect.width));
      let top = Math.max(0, Math.min(e.clientY - offsetY, window.innerHeight - rect.height));
      b.style.left = `${left}px`;
      b.style.top = `${top}px`;
      b.style.right = 'auto';
      b.style.bottom = 'auto';
    };

    b.addEventListener('mousedown', e => {
      wasDragged = false;
      pressTimer = setTimeout(() => {
        isDraggingButton = true;
        b.classList.add('dragging');
        const rect = b.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        document.addEventListener('mousemove', move);
      }, 300);
      e.preventDefault();
    });

    document.addEventListener('mouseup', async () => {
      clearTimeout(pressTimer);
      if (isDraggingButton) {
        const current = Object.assign(getButtonDefaultSettings(), safeJsonParse(await backend.get(PC.storage.button), {}));
        current.top = b.style.top.replace('px', '') || '0';
        current.left = b.style.left.replace('px', '') || '0';
        current.bottom = 'auto';
        current.right = 'auto';
        await backend.set(PC.storage.button, JSON.stringify(current));
      }
      b.classList.remove('dragging');
      document.removeEventListener('mousemove', move);
      isDraggingButton = false;
    });

    b.addEventListener('click', e => {
      if (wasDragged) e.stopPropagation();
      else createSidebarCustomizerPopup();
    });
  }

  function createAuxButtons() {
    if (!document.getElementById(PC.ids.tasksButton)) {
      const tasks = document.createElement('button');
      tasks.id = PC.ids.tasksButton;
      tasks.textContent = 'Tasks';
      tasks.style.cssText = 'position:fixed;top:5px;left:350px;height:36px;width:80px;z-index:2147483645;border:none;border-radius:8px;display:none;align-items:center;justify-content:center;background:#22c55e;color:white;cursor:pointer;font-size:13px;font-weight:600;font-family:Inter,sans-serif;box-shadow:0 2px 8px rgba(0,0,0,.15)';
      tasks.onclick = createTasksSidebar;
      document.body.appendChild(tasks);
    }
    if (!document.getElementById(PC.ids.learnGear)) {
      const gear = document.createElement('div');
      gear.id = PC.ids.learnGear;
      gear.textContent = '⚙️';
      gear.style.cssText = 'position:fixed;bottom:45px;left:85px;height:36px;width:36px;z-index:2147483645;display:none;align-items:center;justify-content:center;font-size:21px;cursor:pointer;background:white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,.15)';
      gear.onclick = createColorPickerModal;
      document.body.appendChild(gear);
    }
    if (!document.getElementById(PC.ids.learnButton)) {
      const learn = document.createElement('button');
      learn.id = PC.ids.learnButton;
      learn.style.cssText = 'position:fixed;top:5px;left:435px;height:36px;z-index:2147483645;display:none;align-items:center;justify-content:center;border-radius:8px;padding:0 14px;cursor:pointer;font-size:13px;font-weight:600;font-family:Inter,sans-serif;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,.15);background:#007aff;color:white;border:none;';
      document.body.appendChild(learn);
    }
  }

  // ===========================================================================
  // PERMISSIONS + CONFIG
  // ===========================================================================
  function isToolAllowed(toolKey) {
    const normalized = normalizeToolKey(toolKey);
    const perms = window.toolPermissions || {};
    const perm = perms[normalized] || perms[toolKey] || null;
    if (!perm) return true;
    if (!perm.location_locking_enabled) return true;
    const locId = getContextLocationId();
    return !!(locId && Array.isArray(perm.allowed_location_ids) && perm.allowed_location_ids.indexOf(locId) !== -1);
  }

  async function loadConfigFromBackend() {
    const locId = getContextLocationId();
    window.toolPermissions = {};
    window.urlConfig = {};
    window.locationLocking = { enabled: false, allowedLocations: [] };
    if (!locId) return;

    const toursUrl = `${PC.WORKER_URL}/api/get-animated-tours?location_id=${encodeURIComponent(locId)}`;
    const permsUrl = `${PC.WORKER_URL}/api/get-all-settings?location_id=${encodeURIComponent(locId)}`;

    const [tours, perms] = await Promise.all([
      fetch(toursUrl).then(r => r.json()).catch(() => ({ status: 'error' })),
      fetch(permsUrl).then(r => r.json()).catch(() => ({ status: 'error' }))
    ]);

    if (tours.status === 'success' && tours.data) {
      window.urlConfig = tours.data.urlConfig || {};
      window.locationLocking = tours.data.locationLocking || { enabled: false, allowedLocations: [] };
    }

    if (perms.status === 'success' && perms.data) {
      window.toolPermissions = {
        tours: perms.data.tours || perms.data.animated_tours || {},
        tasks: perms.data.tasks || perms.data.onboarding_tasks || {},
        field_mappings: perms.data.field_mappings || {},
        sidebar: perms.data.sidebar || perms.data.sidebar_customizations || {}
      };
    }
  }

  // ===========================================================================
  // VIDEO / COLOR MODALS
  // ===========================================================================
  function createVideoModal(videoUrl) {
    closeAllPopups();
    const overlay = document.createElement('div');
    overlay.className = 'gbx-modal-overlay';
    overlay.style.backgroundColor = 'rgba(0,0,0,.7)';
    const content = document.createElement('div');
    content.className = 'gbx-modal-content';
    content.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:90%;max-width:80vw;z-index:2147483647;background:transparent;box-shadow:none;';
    content.innerHTML = `<div style="position:relative;padding-bottom:56.25%;height:0;background:black;border-radius:12px;overflow:hidden;"><iframe src="${videoUrl}" style="position:absolute;inset:0;width:100%;height:100%;border:0;" allowfullscreen></iframe></div>`;
    const close = document.createElement('button');
    close.className = 'gbx-modal-close-btn';
    close.innerHTML = '&times;';
    close.style.cssText = 'position:fixed;top:20px;right:30px;width:40px;height:40px;background:white;color:black;border-radius:50%;border:0;font-size:32px;font-weight:bold;cursor:pointer;z-index:2147483647;display:flex;align-items:center;justify-content:center;';
    overlay.onclick = closeAllPopups;
    close.onclick = closeAllPopups;
    document.body.append(overlay, content, close);
  }

  async function createColorPickerModal() {
    closeAllPopups();
    const colors = await getColors() || {};
    const overlay = document.createElement('div');
    overlay.className = 'gbx-modal-overlay';
    const content = document.createElement('div');
    content.className = 'gbx-modal-content';
    content.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:white;color:black;padding:25px;border-radius:10px;z-index:2147483647;font-family:Inter,sans-serif;box-shadow:0 4px 15px rgba(0,0,0,.2);';
    content.innerHTML = `
      <h3 style="margin-top:0;text-align:center;">Customize Button Colors</h3>
      <div style="display:flex;justify-content:space-around;align-items:center;margin:25px 0;gap:20px;">
        <label>Background: <input type="color" id="bgColorPicker" value="${colors.background || '#000000'}"></label>
        <label>Text: <input type="color" id="textColorPicker" value="${colors.text || '#ffffff'}"></label>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:15px;">
        <button id="colorReset" style="padding:8px 12px;border:0;background:none;color:#007aff;cursor:pointer;">Reset</button>
        <div><button id="colorCancel" style="padding:8px 15px;border-radius:5px;border:1px solid #ccc;background:#f0f0f0;cursor:pointer;margin-right:8px;">Cancel</button><button id="colorSave" style="padding:8px 15px;border-radius:5px;border:0;background:#007aff;color:white;cursor:pointer;">Save</button></div>
      </div>
    `;
    overlay.onclick = closeAllPopups;
    content.querySelector('#colorCancel').onclick = closeAllPopups;
    content.querySelector('#colorSave').onclick = async () => {
      await saveColors({ background: content.querySelector('#bgColorPicker').value, text: content.querySelector('#textColorPicker').value });
      closeAllPopups();
    };
    content.querySelector('#colorReset').onclick = async () => {
      await resetColors();
      closeAllPopups();
      createColorPickerModal();
    };
    document.body.append(overlay, content);
  }

  // ===========================================================================
  // LOCATION ACCESS
  // ===========================================================================
  function createLocationAccessSidebar() {
    closeAllPopups();

    const locId = getContextLocationId();
    const overlay = document.createElement('div');
    overlay.className = 'gbx-modal-overlay';
    overlay.style.backgroundColor = 'rgba(0,0,0,.4)';

    const sidebar = document.createElement('div');
    sidebar.className = 'gbx-sidebar';
    sidebar.style.cssText = 'position:fixed;top:0;left:0;height:100vh;width:70vw;min-width:900px;max-width:1200px;background:#f9f9f9;z-index:2147483647;box-shadow:3px 0 15px rgba(0,0,0,.2);transform:translateX(-100%);transition:transform .3s ease;padding:25px;box-sizing:border-box;display:flex;flex-direction:column;';
    sidebar.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;"><h2 style="margin:0;color:#333;">Manage Location Access</h2><button id="loc-access-close" style="border:0;border-radius:50%;width:30px;height:30px;font-size:24px;cursor:pointer;">&times;</button></div>
      <div id="loc-access-content" style="flex:1;overflow-y:auto;margin-top:20px;"><p>Loading locations...</p></div>
      <div style="padding-top:15px;border-top:1px solid #ddd;"><button id="save-loc-access-btn" style="background:#007aff;color:#fff;border:0;border-radius:5px;padding:12px;font-size:1rem;cursor:pointer;width:100%;">Save Access Settings</button></div>
    `;

    const close = () => { sidebar.style.transform = 'translateX(-100%)'; setTimeout(() => { overlay.remove(); sidebar.remove(); }, 300); };
    overlay.onclick = close;
    sidebar.querySelector('#loc-access-close').onclick = close;

    document.body.append(overlay, sidebar);
    setTimeout(() => sidebar.style.transform = 'translateX(0)', 10);

    const content = sidebar.querySelector('#loc-access-content');
    const tools = [
      { id: 'tours', backendId: 'animated_tours', label: 'Animated Tours' },
      { id: 'tasks', backendId: 'onboarding_tasks', label: 'Tasks' },
      { id: 'field_mappings', backendId: 'field_mappings', label: 'Custom Field Mapping' },
      { id: 'sidebar', backendId: 'sidebar_customizations', label: 'Sidebar Customizer' }
    ];

    if (!locId) {
      content.innerHTML = '<p style="color:red;">Error: No location context found. Open a sub-account first.</p>';
      return;
    }

    fetch(`${PC.WORKER_URL}/api/get-agency-locations?location_id=${encodeURIComponent(locId)}`)
      .then(r => r.json())
      .then(result => {
        if (result.status !== 'success') throw new Error(result.message || 'Failed to load.');
        const allLocations = result.data.allLocations || [];
        const toolSettings = result.data.toolSettings || {};

        const globalHtml = `
          <div style="background:white;border:1px solid #ddd;padding:15px;border-radius:8px;margin-bottom:15px;">
            <h4 style="margin-top:0;">Global Tool Access</h4>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
              ${tools.map(t => {
                const s = toolSettings[t.id] || toolSettings[t.backendId] || {};
                return `<label><input type="checkbox" id="global-checkbox-${t.id}" data-tool="${t.id}" ${!s.location_locking_enabled ? 'checked' : ''}> Enable ${t.label} for all locations</label>`;
              }).join('')}
            </div>
          </div>`;

        const locationHtml = allLocations.map(loc => {
          const rows = tools.map(t => {
            const s = toolSettings[t.id] || toolSettings[t.backendId] || {};
            const checked = !s.location_locking_enabled || (Array.isArray(s.allowed_location_ids) && s.allowed_location_ids.includes(loc.id));
            return `<label><input type="checkbox" class="loc-checkbox" data-tool="${t.id}" data-location-id="${loc.id}" ${checked ? 'checked' : ''}> ${t.label}</label>`;
          }).join('');
          return `<div class="loc-access-item" data-location-id="${loc.id}" style="display:block;padding:12px;border-radius:6px;margin-bottom:8px;background:white;border:1px solid #eee;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;"><div><strong>${loc.name}</strong><br><small style="color:#777;">ID: ${loc.id}</small></div></div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px 12px;padding-top:10px;border-top:1px solid #f0f0f0;">
              <label><input type="checkbox" class="loc-checkbox" data-tool="all" data-location-id="${loc.id}"><strong>Select All</strong></label>${rows}
            </div>
          </div>`;
        }).join('');

        content.innerHTML = `${globalHtml}<input type="search" id="loc-search" placeholder="Search locations..." style="width:100%;padding:10px;margin-bottom:10px;border:1px solid #ccc;border-radius:5px;box-sizing:border-box;"><div id="loc-checklist">${locationHtml}</div>`;

        const checklist = content.querySelector('#loc-checklist');
        function syncAllBoxes() {
          checklist.querySelectorAll('.loc-access-item').forEach(item => {
            const all = item.querySelector('[data-tool="all"]');
            const cbs = Array.from(item.querySelectorAll('[data-tool]:not([data-tool="all"])'));
            all.checked = cbs.every(cb => cb.checked);
          });
        }
        function applyGlobal(tool) {
          const isGlobal = content.querySelector(`#global-checkbox-${tool}`).checked;
          checklist.querySelectorAll(`.loc-checkbox[data-tool="${tool}"]`).forEach(cb => { cb.disabled = isGlobal; cb.checked = isGlobal; });
          syncAllBoxes();
        }
        tools.forEach(t => applyGlobal(t.id));
        content.querySelectorAll('[id^="global-checkbox-"]').forEach(cb => cb.addEventListener('change', () => applyGlobal(cb.dataset.tool)));
        checklist.addEventListener('change', e => {
          if (!e.target.classList.contains('loc-checkbox')) return;
          const item = e.target.closest('.loc-access-item');
          if (e.target.dataset.tool === 'all') {
            item.querySelectorAll('[data-tool]:not([data-tool="all"])').forEach(cb => { if (!cb.disabled) cb.checked = e.target.checked; });
          }
          syncAllBoxes();
        });
        content.querySelector('#loc-search').oninput = e => {
          const q = e.target.value.toLowerCase();
          checklist.querySelectorAll('.loc-access-item').forEach(item => item.style.display = item.innerText.toLowerCase().includes(q) ? 'block' : 'none');
        };
      })
      .catch(err => { content.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`; });

    sidebar.querySelector('#save-loc-access-btn').onclick = e => {
      const save = e.target;
      save.disabled = true;
      save.textContent = 'Saving...';
      const permissions = {};
      tools.forEach(t => {
        const isGlobal = document.getElementById(`global-checkbox-${t.id}`)?.checked;
        const allowed = [];
        if (!isGlobal) document.querySelectorAll(`.loc-checkbox[data-tool="${t.id}"]:checked`).forEach(cb => allowed.push(cb.dataset.locationId));
        permissions[t.backendId] = { location_locking_enabled: !isGlobal, allowed_location_ids: allowed };
      });
      fetch(`${PC.WORKER_URL}/api/save-location-access`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locationId: locId, permissions })
      }).then(r => r.json()).then(async result => {
        if (result.status !== 'success') throw new Error(result.message || 'Save failed.');
        await loadConfigFromBackend();
        showAlert('Location access settings updated.');
        close();
      }).catch(err => showAlert(`Error saving settings: ${err.message}`)).finally(() => {
        save.disabled = false;
        save.textContent = 'Save Access Settings';
      });
    };
  }

  // ===========================================================================
  // TOURS SIDEBAR
  // ===========================================================================
  function createAnimatedToursSidebar() {
    if (!isToolAllowed('tours')) return showAlert('Animated Tours are not enabled for this location.');
    closeAllPopups();

    const locId = getContextLocationId();
    const overlay = document.createElement('div');
    overlay.className = 'gbx-modal-overlay';
    overlay.style.backgroundColor = 'rgba(0,0,0,.6)';
    const sidebar = document.createElement('div');
    sidebar.className = 'gbx-sidebar';
    sidebar.style.cssText = 'position:fixed;top:0;right:0;height:100vh;width:35vw;min-width:450px;max-width:700px;background:white;z-index:2147483647;box-shadow:-3px 0 15px rgba(0,0,0,.2);transform:translateX(100%);transition:transform .3s ease;padding:25px;box-sizing:border-box;display:flex;flex-direction:column;';
    sidebar.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;"><h2 style="margin:0;color:#333;">Animated Tours</h2><button id="tour-close" style="border:0;border-radius:50%;width:30px;height:30px;font-size:24px;cursor:pointer;">&times;</button></div>
      <div id="tour-grid-container" style="flex:1;overflow-y:auto;margin-top:25px;padding:5px;"></div>
      <div style="padding-top:15px;border-top:1px solid #eee;"><button id="save-tours-btn" style="background:#007aff;color:white;border:0;border-radius:5px;padding:12px;font-size:1rem;cursor:pointer;width:100%;">Save URL Changes</button></div>
    `;
    const close = () => { sidebar.style.transform = 'translateX(100%)'; setTimeout(() => { overlay.remove(); sidebar.remove(); }, 300); };
    overlay.onclick = close;
    sidebar.querySelector('#tour-close').onclick = close;
    document.body.append(overlay, sidebar);
    setTimeout(() => sidebar.style.transform = 'translateX(0)', 10);

    const gridContainer = sidebar.querySelector('#tour-grid-container');

    function row(path = '', url = '') {
      const grid = gridContainer.querySelector('#tour-grid');
      const pathInput = document.createElement('input');
      pathInput.className = 'tour-path-input';
      pathInput.value = path;
      pathInput.placeholder = '/dashboard';
      pathInput.style.cssText = 'width:100%;box-sizing:border-box;padding:8px;border:1px solid #ccc;border-radius:4px;';
      const urlInput = document.createElement('input');
      urlInput.className = 'tour-url-input';
      urlInput.value = url;
      urlInput.placeholder = 'Video embed URL';
      urlInput.style.cssText = pathInput.style.cssText;
      const delWrap = document.createElement('div');
      delWrap.style.cssText = 'display:flex;justify-content:center;';
      const del = button('×');
      del.style.cssText = 'background:none;border:0;font-size:24px;cursor:pointer;font-weight:bold;';
      del.onclick = () => { pathInput.remove(); urlInput.remove(); delWrap.remove(); };
      delWrap.appendChild(del);
      grid.append(pathInput, urlInput, delWrap);
    }

    function populate(config) {
      gridContainer.innerHTML = `<div id="tour-grid" style="display:grid;grid-template-columns:1fr 1.5fr 30px;gap:12px 15px;align-items:center;"><div style="font-weight:bold;border-bottom:2px solid #eee;padding-bottom:8px;">URL Path</div><div style="font-weight:bold;border-bottom:2px solid #eee;padding-bottom:8px;">Video Embed URL</div><div></div></div>`;
      Object.entries(config || {}).forEach(([p, u]) => row(p, u));
      const add = button('+ Add Row');
      add.style.cssText = 'background:none;border:0;color:#007aff;cursor:pointer;font-size:1rem;padding:10px 5px;text-align:left;';
      add.onclick = () => row();
      gridContainer.appendChild(add);
    }
    populate(window.urlConfig || {});

    sidebar.querySelector('#save-tours-btn').onclick = e => {
      if (!locId) return showAlert('Error: Cannot save. Location context not found.');
      const save = e.target;
      save.disabled = true;
      save.textContent = 'Saving...';
      const config = {};
      const paths = sidebar.querySelectorAll('.tour-path-input');
      const urls = sidebar.querySelectorAll('.tour-url-input');
      paths.forEach((p, i) => { if (p.value.trim()) config[p.value.trim()] = urls[i].value.trim(); });
      fetch(`${PC.WORKER_URL}/api/save-animated-tours`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locationId: locId, config })
      }).then(r => r.json()).then(result => {
        if (result.status !== 'success') throw new Error(result.message || 'Save failed.');
        window.urlConfig = config;
        showAlert('Configuration updated.');
        close();
      }).catch(err => showAlert(`Failed to save: ${err.message}`)).finally(() => {
        save.disabled = false;
        save.textContent = 'Save URL Changes';
      });
    };
  }

  // ===========================================================================
  // TASKS SIDEBAR + ONBOARDING WIDGET
  // ===========================================================================
  async function ensureSortable() {
    if (typeof window.Sortable !== 'undefined') return true;
    return loadScriptOnce('gbx-sortablejs', 'https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js');
  }

  async function createTasksSidebar() {
    if (!isToolAllowed('tasks')) return showAlert('Tasks are not enabled for this location.');
    closeAllPopups();
    await ensureSortable();

    const locId = getContextLocationId();
    const overlay = document.createElement('div');
    overlay.className = 'gbx-modal-overlay';
    overlay.style.backgroundColor = 'rgba(0,0,0,.6)';
    const sidebar = document.createElement('div');
    sidebar.className = 'gbx-sidebar';
    sidebar.style.cssText = 'position:fixed;top:0;right:0;height:100vh;width:60vw;min-width:800px;max-width:1000px;background:white;z-index:2147483647;box-shadow:-3px 0 15px rgba(0,0,0,.2);transform:translateX(100%);transition:transform .3s ease;padding:25px;box-sizing:border-box;display:flex;flex-direction:column;';
    sidebar.innerHTML = `
      <style>
        .gbx-task-headers,.gbx-task-row{display:grid;gap:10px 15px;align-items:center;padding:8px;margin-bottom:8px;}
        .gbx-task-row{background:#fff;border:1px solid #eee;border-radius:6px;cursor:grab;}
        .gbx-task-row-fixed,.gbx-task-headers.gbx-task-row-fixed{grid-template-columns:1fr 1.5fr 1.5fr 1fr 40px;}
        .gbx-task-row-recurring,.gbx-task-headers.gbx-task-row-recurring{grid-template-columns:1fr 1.5fr 1.5fr 1fr 1fr 40px;}
        .gbx-task-edit-input{width:100%;box-sizing:border-box;padding:8px;border:1px solid #ccc;border-radius:4px;font-size:.9rem;}
        .gbx-task-delete-btn{background:#fbebeb;border:1px solid #f4c7c7;color:#c82333;font-size:18px;cursor:pointer;border-radius:50%;width:28px;height:28px;}
      </style>
      <div style="display:flex;justify-content:space-between;align-items:center;"><h2 style="margin:0;color:#333;">Configure Onboarding Tasks</h2><button id="tasks-close" style="border:0;border-radius:50%;width:30px;height:30px;font-size:24px;cursor:pointer;">&times;</button></div>
      <div id="tasks-editor-content" style="flex:1;overflow-y:auto;margin-top:25px;padding:5px;"><p>Loading tasks...</p></div>
      <div style="padding-top:15px;border-top:1px solid #eee;"><button id="save-tasks-btn" style="background:#007aff;color:white;border:0;border-radius:5px;padding:12px;font-size:1rem;cursor:pointer;width:100%;">Save Task Changes</button></div>
    `;
    const close = () => { sidebar.style.transform = 'translateX(100%)'; setTimeout(() => { overlay.remove(); sidebar.remove(); }, 300); };
    overlay.onclick = close;
    sidebar.querySelector('#tasks-close').onclick = close;
    document.body.append(overlay, sidebar);
    setTimeout(() => sidebar.style.transform = 'translateX(0)', 10);

    const content = sidebar.querySelector('#tasks-editor-content');

    function createTaskRow(task, users) {
      const recurring = task.task_type === 'recurring';
      const row = document.createElement('div');
      row.className = `gbx-task-row ${recurring ? 'gbx-task-row-recurring' : 'gbx-task-row-fixed'}`;
      row.dataset.taskType = task.task_type || 'fixed';
      const userOpts = ['<option value="">Unassigned</option>'].concat((users || []).map(u => `<option value="${u.id}" ${task.assigned_user_id === u.id ? 'selected' : ''}>${u.name || u.email || u.id}</option>`)).join('');
      const freq = recurring ? `<select class="gbx-task-edit-input gbx-task-frequency-select"><option value="daily" ${task.recurring_frequency === 'daily' ? 'selected' : ''}>Daily</option><option value="weekly" ${task.recurring_frequency === 'weekly' ? 'selected' : ''}>Weekly</option><option value="monthly" ${task.recurring_frequency === 'monthly' ? 'selected' : ''}>Monthly</option></select>` : '';
      row.innerHTML = `
        <input class="gbx-task-edit-input gbx-task-title-input" value="${String(task.title || '').replace(/"/g, '&quot;')}" placeholder="Task Title">
        <input class="gbx-task-edit-input gbx-task-desc-input" value="${String(task.description || '').replace(/"/g, '&quot;')}" placeholder="Description">
        <input class="gbx-task-edit-input gbx-task-url-input" value="${String(task.video_url || '').replace(/"/g, '&quot;')}" placeholder="Video Embed URL">
        <select class="gbx-task-edit-input gbx-task-user-select">${userOpts}</select>
        ${freq}
        <div style="display:flex;justify-content:center;"><button class="gbx-task-delete-btn">&times;</button></div>`;
      row.querySelector('.gbx-task-delete-btn').onclick = () => row.remove();
      return row;
    }

    function populate(tasks, users) {
      const fixed = (tasks || []).filter(t => (t.task_type || 'fixed') === 'fixed');
      const recurring = (tasks || []).filter(t => t.task_type === 'recurring');
      content.innerHTML = `
        <div style="margin-bottom:25px;padding-bottom:15px;border-bottom:2px solid #ddd;"><h3>Onboarding Tasks</h3><div class="gbx-task-headers gbx-task-row-fixed"><div>Title</div><div>Description</div><div>Video URL</div><div>Assigned To</div><div></div></div><div id="fixed-tasks-container"></div><button class="add-task-btn" data-task-type="fixed" style="background:none;border:0;color:#007aff;cursor:pointer;font-size:1rem;padding:15px 5px;">+ Add Onboarding Task</button></div>
        <div style="margin-bottom:25px;"><h3>Recurring Tasks</h3><div class="gbx-task-headers gbx-task-row-recurring"><div>Title</div><div>Description</div><div>Video URL</div><div>Assigned To</div><div>Frequency</div><div></div></div><div id="recurring-tasks-container"></div><button class="add-task-btn" data-task-type="recurring" style="background:none;border:0;color:#007aff;cursor:pointer;font-size:1rem;padding:15px 5px;">+ Add Recurring Task</button></div>`;
      const fixedEl = content.querySelector('#fixed-tasks-container');
      const recurEl = content.querySelector('#recurring-tasks-container');
      fixed.forEach(t => fixedEl.appendChild(createTaskRow(Object.assign({}, t, { task_type: 'fixed' }), users)));
      recurring.forEach(t => recurEl.appendChild(createTaskRow(Object.assign({}, t, { task_type: 'recurring' }), users)));
      content.querySelectorAll('.add-task-btn').forEach(btn => btn.onclick = () => {
        const type = btn.dataset.taskType;
        content.querySelector(type === 'fixed' ? '#fixed-tasks-container' : '#recurring-tasks-container').appendChild(createTaskRow({ task_type: type }, users));
      });
      if (typeof window.Sortable !== 'undefined') {
        new window.Sortable(fixedEl, { animation: 150 });
        new window.Sortable(recurEl, { animation: 150 });
      }
    }

    if (!locId) {
      content.innerHTML = '<p style="color:red;">Error: No location context found.</p>';
    } else {
      Promise.all([
        fetch(`${PC.WORKER_URL}/api/get-tasks?location_id=${encodeURIComponent(locId)}`).then(r => r.json()),
        fetch(`${PC.WORKER_URL}/api/get-location-users?location_id=${encodeURIComponent(locId)}`).then(r => r.json()).catch(() => ({ status: 'error', data: [] }))
      ]).then(([tasksRes, usersRes]) => {
        if (tasksRes.status !== 'success') throw new Error(tasksRes.message || 'Could not load tasks.');
        populate(tasksRes.data || [], usersRes.status === 'success' ? usersRes.data : []);
      }).catch(err => { content.innerHTML = `<p style="color:red;">Error loading tasks: ${err.message}</p>`; });
    }

    sidebar.querySelector('#save-tasks-btn').onclick = e => {
      if (!locId) return showAlert('Error: Cannot save. Location context not found.');
      const save = e.target;
      save.disabled = true;
      save.textContent = 'Saving...';
      const tasks = [];
      sidebar.querySelectorAll('#fixed-tasks-container .gbx-task-row,#recurring-tasks-container .gbx-task-row').forEach((row, index) => {
        const title = row.querySelector('.gbx-task-title-input').value.trim();
        if (!title) return;
        tasks.push({
          title,
          description: row.querySelector('.gbx-task-desc-input').value.trim(),
          videoUrl: row.querySelector('.gbx-task-url-input').value.trim(),
          task_order: index + 1,
          taskType: row.dataset.taskType,
          recurringFrequency: row.dataset.taskType === 'recurring' ? row.querySelector('.gbx-task-frequency-select').value : null,
          assignedUserId: row.querySelector('.gbx-task-user-select').value || null
        });
      });
      fetch(`${PC.WORKER_URL}/api/save-tasks`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locationId: locId, tasks })
      }).then(r => r.json()).then(result => {
        if (result.status !== 'success') throw new Error(result.message || 'Save failed.');
        showAlert('Tasks updated.');
        close();
      }).catch(err => showAlert(`Error saving tasks: ${err.message}`)).finally(() => {
        save.disabled = false;
        save.textContent = 'Save Task Changes';
      });
    };
  }

  function initLocationOnboardingWidget() {
    if (isWidgetInitializationAttempted) return;
    isWidgetInitializationAttempted = true;

    const locId = getContextLocationId();
    if (!locId) return;

    ensureSortable();
    fetch(`${PC.WORKER_URL}/api/get-tasks?location_id=${encodeURIComponent(locId)}`)
      .then(r => r.json())
      .then(result => {
        if (result.status !== 'success' || !Array.isArray(result.data) || !result.data.length) return;
        const settings = result.settings || {};
        if (settings.enabled && Array.isArray(settings.allowed_location_ids) && !settings.allowed_location_ids.includes(locId)) return;
        setupLocationWidgets(result.data);
      })
      .catch(err => console.error('[GearBOX Customizer] Failed to load onboarding widget:', err));
  }

  function setupLocationWidgets(tasks) {
    if (document.getElementById(PC.ids.widgetButtons)) return;
    const fixed = tasks.filter(t => (t.task_type || 'fixed') === 'fixed');
    const recurring = tasks.filter(t => t.task_type === 'recurring');
    if (!fixed.length && !recurring.length) return;

    const container = document.createElement('div');
    container.id = PC.ids.widgetButtons;
    container.style.cssText = 'position:fixed;top:8px;left:240px;z-index:9998;display:none;gap:10px;';
    document.body.appendChild(container);

    if (!document.getElementById('gbx-onboarding-widget-styles')) {
      const style = document.createElement('style');
      style.id = 'gbx-onboarding-widget-styles';
      style.textContent = `
        .gbx-widget-toggle-button{background:linear-gradient(135deg,#225af8,#1b4ac9);color:white;border:0;border-radius:6px;padding:8px 12px;font-size:14px;font-weight:600;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.2);}
        .gbx-widget-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:100000;display:none;align-items:center;justify-content:center;}
        .gbx-widget-modal-overlay.show{display:flex;}
        .gbx-onboarding-widget{font-family:Figtree,sans-serif;background:#f7f7f7;color:#333;border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.15);padding:20px;width:380px;position:relative;}
        .gbx-widget-recurring{width:800px;max-width:90vw;}
        .gbx-close-widget{position:absolute;top:12px;right:12px;background:none;border:0;font-size:24px;color:#999;cursor:pointer;}
        .gbx-progress-container{background:#e0e0e0;border-radius:12px;margin-bottom:20px;overflow:hidden;width:100%;height:20px;}
        .gbx-progress-bar{height:100%;width:0%;background:linear-gradient(90deg,#66bb6a,#43a047);transition:width .4s;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:14px;color:white;}
        .gbx-task-list{list-style:none;padding:0;margin:0;max-height:42vh;overflow:auto;}
        .gbx-task-list li{display:flex;align-items:center;gap:8px;margin:8px 0;padding:12px;background:white;border:1px solid #ddd;border-radius:8px;cursor:pointer;}
        .gbx-task-list li.completed .gbx-task-title span{text-decoration:line-through;color:#999;}
        .gbx-task-play-icon{background:#66bb6a;color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;}
      `;
      document.head.appendChild(style);
    }

    function createWidget(type, label, list) {
      const btn = document.createElement('button');
      btn.className = 'gbx-widget-toggle-button';
      btn.textContent = label;
      container.appendChild(btn);

      const modal = document.createElement('div');
      modal.className = 'gbx-widget-modal-overlay';
      const ulId = `gbx-${type}-task-list`;
      modal.innerHTML = `
        <div class="gbx-onboarding-widget gbx-widget-${type}">
          <button class="gbx-close-widget">&times;</button>
          <div style="display:flex;align-items:center;margin-bottom:20px;"><img src="https://storage.googleapis.com/msgsndr/GstSBkij3V0hBa0iAEmg/media/67c0ea171ae850287f73d65f.gif" style="width:60px;height:60px;margin-right:12px;"><div><h1 style="font-size:18px;margin:0;">${type === 'fixed' ? 'Welcome to Onboarding!' : 'Your Tasks'}</h1><h2 style="font-size:12px;color:#777;margin:4px 0 0;">${type === 'fixed' ? 'Complete your onboarding tasks.' : 'Stay on top of your recurring tasks.'}</h2></div></div>
          <div class="gbx-progress-container"><div id="gbx-progress-${type}" class="gbx-progress-bar">0%</div></div>
          <ul id="${ulId}" class="gbx-task-list"></ul>
        </div>`;
      document.body.appendChild(modal);

      const ul = modal.querySelector(`#${ulId}`);
      const progressBar = modal.querySelector(`#gbx-progress-${type}`);
      const storageKey = `gbx_onboarding_completed_${type}_${getContextLocationId()}`;

      list.forEach(task => {
        const li = document.createElement('li');
        li.dataset.taskId = task.id;
        li.innerHTML = `<div style="flex:1;"><div class="gbx-task-title" style="font-size:14px;font-weight:700;"><span>${task.title || ''}</span></div><div style="font-size:12px;color:#666;">${task.description || ''}</div></div>${task.video_url ? `<div class="gbx-task-play-icon" data-video-url="${task.video_url}">▶</div>` : ''}`;
        ul.appendChild(li);
      });

      function loadProgress() { return safeJsonParse(localStorage.getItem(storageKey), {}); }
      function saveProgress(p) { localStorage.setItem(storageKey, JSON.stringify(p)); }
      function update() {
        const p = loadProgress();
        let count = 0;
        ul.querySelectorAll('li').forEach(li => {
          if (p[li.dataset.taskId]) { li.classList.add('completed'); count++; }
          else li.classList.remove('completed');
        });
        const pct = list.length ? Math.round((count / list.length) * 100) : 0;
        progressBar.style.width = `${pct}%`;
        progressBar.textContent = `${pct}%`;
      }

      ul.onclick = e => {
        const li = e.target.closest('li');
        if (!li) return;
        if (e.target.classList.contains('gbx-task-play-icon')) {
          createVideoModal(e.target.dataset.videoUrl);
          return;
        }
        const p = loadProgress();
        p[li.dataset.taskId] = !p[li.dataset.taskId];
        saveProgress(p);
        update();
      };

      update();
      btn.onclick = () => modal.classList.add('show');
      modal.querySelector('.gbx-close-widget').onclick = () => modal.classList.remove('show');
      modal.onclick = e => { if (e.target === modal) modal.classList.remove('show'); };
    }

    if (fixed.length) createWidget('fixed', 'Onboarding', fixed);
    if (recurring.length) createWidget('recurring', 'My Tasks', recurring);
  }

  // ===========================================================================
  // HEADER DROPDOWN + DYNAMIC BUTTON VISIBILITY
  // ===========================================================================
  function createPlatformCustomizerDropdown(trigger) {
    closeAllPopups();
    const rect = trigger.getBoundingClientRect();
    const overlay = document.createElement('div');
    overlay.className = 'gbx-modal-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:transparent;z-index:99999;';
    const dd = document.createElement('div');
    dd.className = 'gbx-dropdown';
    dd.style.cssText = `position:absolute;top:${rect.bottom + 5}px;left:${rect.left}px;background:white;border-radius:8px;box-shadow:0 4px 15px rgba(0,0,0,.2);z-index:100000;overflow:hidden;`;
    [
      { label: 'Animated Tours', action: createAnimatedToursSidebar },
      { label: 'Tasks', action: createTasksSidebar },
      { label: 'Customize Sidebar', action: createSidebarCustomizerPopup },
      { divider: true },
      { label: 'Manage Location Access', action: createLocationAccessSidebar }
    ].forEach(item => {
      if (item.divider) {
        const d = document.createElement('div');
        d.style.cssText = 'height:1px;background:#eee;margin:4px 0;';
        dd.appendChild(d);
      } else {
        const el = document.createElement('div');
        el.textContent = item.label;
        el.style.cssText = 'padding:12px 20px;cursor:pointer;color:#333;white-space:nowrap;';
        el.onmouseenter = () => el.style.backgroundColor = '#f0f0f0';
        el.onmouseleave = () => el.style.backgroundColor = 'white';
        el.onclick = () => { closeAllPopups(); item.action(); };
        dd.appendChild(el);
      }
    });
    overlay.onclick = closeAllPopups;
    document.body.append(overlay, dd);
  }

  async function updateDynamicButton() {
    const currentPath = window.location.pathname;
    const locId = getContextLocationId();
    const isInLocationView = currentPath.includes('/location/');
    let mode = 'hidden';

    if (isInLocationView) {
      let allowed = true;
      if (window.locationLocking && window.locationLocking.enabled) {
        allowed = !!(locId && Array.isArray(window.locationLocking.allowedLocations) && window.locationLocking.allowedLocations.includes(locId));
      }
      if (allowed) mode = 'learn';
    } else if (locId) {
      mode = 'tours';
    }

    const tasksBtn = document.getElementById(PC.ids.tasksButton);
    const gear = document.getElementById(PC.ids.learnGear);
    const learn = document.getElementById(PC.ids.learnButton);
    if (tasksBtn) tasksBtn.style.display = (mode === 'learn' && isToolAllowed('tasks')) ? 'flex' : 'none';
    if (gear) gear.style.display = mode === 'learn' ? 'flex' : 'none';
    if (learn) learn.style.display = 'none';

    const target = document.querySelector('.sidebar-v2-location header .container-fluid, .sidebar-v2-agency header .container-fluid');
    let wrapper = document.getElementById(PC.ids.headerWrapper);
    if (!wrapper && target) {
      target.style.position = 'relative';
      wrapper = document.createElement('div');
      wrapper.id = PC.ids.headerWrapper;
      wrapper.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:999;display:flex;align-items:center;gap:10px;';
      target.appendChild(wrapper);
    }

    if (wrapper) {
      if (wrapper.dataset.mode !== mode) {
        wrapper.dataset.mode = mode;
        if (mode === 'tours') {
          wrapper.innerHTML = '<button id="platform-customizer-button">Platform Customizer</button>';
          const btn = wrapper.querySelector('#platform-customizer-button');
          btn.style.cssText = 'font-family:Inter,sans-serif;font-size:14px;color:white;border:0;border-radius:8px;padding:7px 14px;cursor:pointer;font-weight:500;white-space:nowrap;background:#007aff;';
          btn.onclick = ev => createPlatformCustomizerDropdown(ev.currentTarget);
          wrapper.style.display = 'flex';
        } else {
          wrapper.style.display = 'none';
        }
      } else {
        wrapper.style.display = mode === 'tours' ? 'flex' : 'none';
      }
    }

    if (mode === 'learn' && learn) {
      let bestMatch = '';
      Object.keys(window.urlConfig || {}).forEach(pathKey => {
        if (currentPath.includes(pathKey) && pathKey.length > bestMatch.length) bestMatch = pathKey;
      });
      const videoUrl = bestMatch ? window.urlConfig[bestMatch] : null;
      if (videoUrl) {
        let pageName = 'THIS PAGE';
        const active = document.querySelector('a.active.exact-active span.nav-title, .router-link-active span, a.router-link-active .nav-title');
        if (active && active.innerText.trim()) pageName = active.innerText.trim().toUpperCase();
        else if (currentPath.includes('/contacts')) pageName = 'CONTACTS';
        else if (currentPath.includes('/dashboard')) pageName = 'DASHBOARD';
        else if (currentPath.includes('/launchpad')) pageName = 'LAUNCHPAD';

        learn.style.display = 'flex';
        learn.textContent = `LEARN ABOUT ${pageName}`;
        learn.onclick = () => createVideoModal(videoUrl);
      }
    }
  }

  function manageWidgetVisibility() {
    const container = document.getElementById(PC.ids.widgetButtons);
    if (!container) return;
    const path = window.location.pathname;
    container.style.display = path.includes('/location/') && /\/dashboard\/?$/.test(path) ? 'flex' : 'none';
  }

  // ===========================================================================
  // MAIN CONTROLLER
  // ===========================================================================
  async function runSetup(retryCount) {
    const retries = retryCount || 0;
    const nav = getNavContainer();
    if (!nav) {
      if (retries < 40) setTimeout(() => runSetup(retries + 1), 150);
      return;
    }

    if (!initialSetupDone) {
      injectStyles();
      createAndAppendButton();
      createAuxButtons();
      initialSetupDone = true;
    }

    const path = window.location.pathname;
    const isLocationView = path.includes('/v2/location/') || path.includes('/location/');
    const isSettingsNav = !!document.querySelector('#sidebar-v2 .hl_nav-header-without-footer, .hl_nav-header-without-footer');

    if (isLocationView && !isSettingsNav && isToolAllowed('sidebar')) {
      const customBtn = document.getElementById(PC.ids.mainButton);
      if (customBtn) customBtn.style.display = 'flex';

      discoverAndRegisterNavComponents();
      createCustomDividers();

      await loadAndApplySavedSettings();
      await loadAndApplyButtonSettings();
      await loadAndApplyIconSettings();
      await loadAndApplyRenameSettings();
      await loadAndApplyAppearanceSettings();
      await applyLogo();
    } else {
      const customBtn = document.getElementById(PC.ids.mainButton);
      if (customBtn) customBtn.style.display = 'none';
      restoreDefaultSidebar();
      restoreDefaultVisuals();
    }

    nav.style.visibility = 'visible';
  }

  async function boot() {
    injectFonts();
    injectStyles();
    createAuxButtons();

    await loadConfigFromBackend();
    await runSetup(0);
    initLocationOnboardingWidget();

    setInterval(() => {
      try {
        if (lastRoute !== window.location.href) {
          lastRoute = window.location.href;
          loadConfigFromBackend().then(() => runSetup(0));
        }
        manageWidgetVisibility();
        updateDynamicButton();
      } catch (e) {
        console.error('[GearBOX Customizer] interval error:', e);
      }
    }, 1000);

    const observer = new MutationObserver(mutations => {
      if (isDragging || isDraggingButton || (openSubMenu && openSubMenu.element)) return;
      if (!mutations.some(m => m.addedNodes.length || m.removedNodes.length)) return;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => runSetup(0), 250);
    });

    if (document.body) observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

})();
