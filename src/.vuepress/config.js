const { description } = require("../../package");

module.exports = {
    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#title
     */
    title: "NOLGONG DEVTOOLS",
    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#description
     */
    description: description,

    /**
     * Extra tags to be injected to the page HTML `<head>`
     *
     * ref：https://v1.vuepress.vuejs.org/config/#head
     */
    head: [
        ["meta", { name: "theme-color", content: "#3eaf7c" }],
        ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
        [
            "meta",
            { name: "apple-mobile-web-app-status-bar-style", content: "black" },
        ],
        ["link", { rel: "icon", href: "logo.png" }],
    ],

    /**
     * Theme configuration, here is the default theme configuration for VuePress.
     *
     * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
     */
    themeConfig: {
        repo: "",
        editLinks: false,
        docsDir: "",
        editLinkText: "",
        lastUpdated: true,
        sidebarDepth: 0,
        nav: [
            {
                text: "guide",
                link: "/guide/",
            },
        ],
        sidebar: [
            {
                title: "Guide!",
                path: "/guide/",
                collapsable: false, // optional, defaults to true
                sidebarDepth: 1, // optional, defaults to 1
                children: ["/guide/", "/guide/buttons", "/guide/cards"],
            },
            {
                title: "Draggable!", // required
                path: "/draggable/", // optional, link of the title, which should be an absolute path and must exist
                collapsable: false, // optional, defaults to true
                sidebarDepth: 1, // optional, defaults to 1
                children: [
                    "/draggable/",
                    "/draggable/dragCommon",
                    "/draggable/dragAndCompare",
                ],
            },
        ],
        // sidebar: {
        //     "/guide/": [
        //         {
        //             title: "Guide",
        //             collapsable: false,
        //             children: [
        //                 "",
        //                 "buttons",
        //                 "cards",
        //                 "games",
        //                 // "draggable",
        //                 // 'parallax'
        //             ],
        //         },
        //     ],
        //     "/draggable/": [
        //         {
        //             title: "Draggable",
        //             collapsable: false,
        //             children: [
        //                 "",
        //                 "dragAndCompare",
        //                 "dragCommon",
        //                 // 'parallax'
        //             ],
        //         },
        //     ],
        // },
    },

    /**
     * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
     */
    plugins: ["@vuepress/plugin-back-to-top", "@vuepress/plugin-medium-zoom"],
};
