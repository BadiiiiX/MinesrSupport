/**
 * @name MinesrSupport
 * @displayName MinesrSupport
 * @website https://www.illutech.fr/
 * @source https://raw.githubusercontent.com/BadiiiiX/MinesrSupport/master/MinesrSupport.plugin.js
 * @paypal https://paypal.me/badiiix
 * @invite Njzk3JS
 * @authorId 259362855462240256
 */

var MineSupport = (() => {
    const config = {
        info:{
            name: "MinesrSupport",
            authors: [{name: "BadiiiX", github_username: "BadiiiiX", twitter_username: "BadiiiX_IT", discord_id: "259362855462240256"}],
            description: "Réouvre le salon pour un support sur le discord de Minestrator",
            version: "1.1.0",
            github: "https://github.com/BadiiiiX/MinesrSupport",
            github_raw: "https://raw.githubusercontent.com/BadiiiiX/MinesrSupport/master/MinesrSupport.plugin.js"
        },
        defaultConfig: [
            {
                type: "switch",
                id: "channels",
                name: "Afficher seulement dans les salons supports",
                note: "Affiche le bouton seulement dans les salons supports (Non Fonctionnel)",
                value: true
            }
        ],
        changelog:[
            {
                "title": "Ajouts / Changements",
                "type": "added",
                "items": ["**Code** : Changement du code complet, il est plus propre, il prend ses douches seul.", "**Mises à jours** : Les MàJ sont désormais automatique, t'as plus rien à toucher maintenant !", "**META** : Nouvelle META, changement du style, mainteant, on est sûr de gagner !"]
            },
            {
                "title": "Bugs Réglés",
                "type": "fixed",
                "items": ["**Duplication** : Le bouton se sentait seul, je lui est ajouté un ami imaginaire"]
            },
            {
                "title": "Fonctions à venir",
                "type": "improved",
                "items": ["**Paramètres** : Ajouts de quelques fonctions, qui arriveront bientôt, mais tu peux déjà les voir, héhé"]
            },
        ]
    };

    return !global.ZeresPluginLibrary ? class {
        constructor(){this._config = config;}
        getName(){return config.info.name;}
        getAuthor(){return config.info.authors.map(a => a.name).join(", ");}
        getDescription(){return config.info.description;}
        getVersion(){return config.info.version;}
        load(){
            const title = "Il te manque une lib :-/";
            const ModalStack = BdApi.findModuleByProps("push", "update", "pop", "popWithKey");
            const TextElement = BdApi.findModuleByProps("Sizes", "Weights");
            const ConfirmationModal = BdApi.findModule(m => m.defaultProps && m.key && m.key() == "confirm-modal");
            if (!ModalStack || !ConfirmationModal || !TextElement) return BdApi.alert(title, `The library plugin needed for ${config.info.name} is missing.<br /><br /> <a href="https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js" target="_blank">Click here to download the library!</a>`);
            ModalStack.push(function(props) {
                return BdApi.React.createElement(ConfirmationModal, Object.assign({
                    header: title,
                    children: [BdApi.React.createElement(TextElement, {color: TextElement.Colors.PRIMARY, children: [`The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`]})],
                    red: false,
                    confirmText: "Télécharger !",
                    cancelText: "Annuler",
                    onConfirm: () => {
                        require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                            if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                            await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                        });
                    }
                }, props));
            });
        }
        start(){}
        stop(){}
    } : (([Plugin, Api]) => {
        const plugin = (Plugin, Api) => {
            const {DiscordSelectors, WebpackModules, DiscordModules, Patcher, ReactComponents, PluginUtilities} = Api;

            return class TypingIndicator extends Plugin {
                onStart(){
                    PluginUtilities.addStyle("MineSupport-css", `
                        .minesrButton:hover {
                            transform: scale(0.5)
                        }
                    `);
                }

                onSwitch() {
                    if (document.querySelector(".minesrButton") == null) {  
                        this.minesrSupportButton = document.getElementsByClassName("toolbar-1t6TWx")[0].insertAdjacentHTML("afterBegin", `
                            <div tabindex="0" class="iconWrapper-2OrFZ1 da-iconWrapper clickable-3rdHwn da-clickable focusable-1YV_-H da-focusable minesrButton" role="button" aria-label="Fermer le Support"
                            onclick="
                                ZeresPluginLibrary.DiscordModules.MessageActions.sendMessage(ZeresPluginLibrary.DiscordModules.SelectedChannelStore.getChannelId(), {'content': '.salonlibre'})
                                setTimeout(() => ZeresPluginLibrary.DiscordModules.MessageActions.sendMessage(ZeresPluginLibrary.DiscordModules.SelectedChannelStore.getChannelId(), {'content': '.cp'}), 1000)
                            ">
                                <svg aria-hidden="true" class="icon-22AiRD da-icon" name="Open Logs" viewBox="0 0 576 512">
                                    <path fill="currentColor" d="M136.309 189.836L312.313 37.851C327.72 24.546 352 35.348 352 56.015v82.763c129.182 10.231 224 52.212 224 183.548 0 61.441-39.582 122.309-83.333 154.132-13.653 9.931-33.111-2.533-28.077-18.631 38.512-123.162-3.922-169.482-112.59-182.015v84.175c0 20.701-24.3 31.453-39.687 18.164L136.309 226.164c-11.071-9.561-11.086-26.753 0-36.328zm-128 36.328L184.313 378.15C199.7 391.439 224 380.687 224 359.986v-15.818l-108.606-93.785A55.96 55.96 0 0 1 96 207.998a55.953 55.953 0 0 1 19.393-42.38L224 71.832V56.015c0-20.667-24.28-31.469-39.687-18.164L8.309 189.836c-11.086 9.575-11.071 26.767 0 36.328z"/>
                                </svg>
                            </div>`);
                    }
                }

                onStop(){
                    PluginUtilities.removeStyle("MineSupport-css");
                }
                
            


                getSettingsPanel(){
                    return this.buildSettingsPanel().getElement();
                }
            };
        };
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
