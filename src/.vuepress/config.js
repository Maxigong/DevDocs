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
                text: "UI",
                link: "/ui/",
            },
            {
                text: "Games",
                link: "/games/",
            },
            {
                text: "Carousel",
                link: "/carousel/",
            },
        ],

        sidebar: {
            "/home/": [
                {
                    title: "Home",
                    collapsable: false,
                    children: ["/ui/", "/games/", "/carousel/"],
                },
            ],
            "/ui/": [
                {
                    title: "UI",
                    collapsable: false,
                    children: [
                        "",
                        "buttons",
                        "cards",
                        // "games",
                        // "dragCommon",
                        //             "/draggable/dragAndCompare",
                        // "draggable",
                        // 'parallax'
                    ],
                },
            ],

            "/games/": [
                {
                    title: "Games",
                    collapsable: false,
                    children: [
                        "",
                        "dragAndCompare",
                        "dragCommon",
                        "dragAndMatch",
                        "pollManyOptions",
                        "sliderManyOptions",
                        "sliderTwoOptions",
                        "cardMatch",
                        // 'parallax'
                    ],
                },
            ],
            "/carousel/": [
                {
                    title: "Carousel",
                    collapsable: false,
                    children: [
                        "",
                        "basicCarousel",
                        "carrouselCircle",
                        "textCarousel",
                    ],
                },
            ],
        },
    },

    /**
     * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
     */
    plugins: ["@vuepress/plugin-back-to-top", "@vuepress/plugin-medium-zoom"],
};
