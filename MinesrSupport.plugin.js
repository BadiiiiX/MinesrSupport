//META{"name":"MineSupport","authorId":"259362855462240256","invite":"Njzk3JS","website":"https://www.illutech.fr/","source":"https://raw.githubusercontent.com/BadiiiiX/MineSrSupport/master/MineSrSupport.plugin.js?token=AOIJWH4TXST64ZJ6273WEES6SIYBQ"}}*//


class MineSupport {
    // Contructor
    constructor() {
        this.initialized = false;
    }

    // Meta
    getName() { return "MineSupport"; }
    getDescription() { return "Un bouton qui permet d'envoyer .salonlibre + .cp avec 1s d'attente"; }
    getVersion() { return "1.0.0"; }
    getAuthor() { return "BadiiiX"; }

    getSettingsPanel() {
        return "Modifications possible à venir...";
    }
    
    // Load/Unload
    load() { }

    unload() { }

    onSwitch() {
        // Called when a server or channel is switched
        const send = msg => ZeresPluginLibrary.DiscordModules.MessageActions.sendMessage(ZeresPluginLibrary.DiscordModules.SelectedChannelStore.getChannelId(), {"content": msg});
        
        
        this.minesrSupportButton = document.getElementsByClassName("toolbar-1t6TWx")[0].insertAdjacentHTML("beforebegin", `
            <button aria-label="Fermer le Salon" tabindex="0" type="button" class="buttonWrapper-1ZmCpA da-buttonWrapper button-38aScr da-button lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN da-grow noFocus-2C7BQj da-noFocus">
                <div class="contents-18-Yxp da-contents button-3AYNKb da-button button-318s1X da-button" onclick="
                    ZeresPluginLibrary.DiscordModules.MessageActions.sendMessage(ZeresPluginLibrary.DiscordModules.SelectedChannelStore.getChannelId(), {'content': '.salonlibre'})
                    setTimeout(() => ZeresPluginLibrary.DiscordModules.MessageActions.sendMessage(ZeresPluginLibrary.DiscordModules.SelectedChannelStore.getChannelId(), {'content': '.cp'}), 1000)
                ">
                    <p class="minesrSupportButton" onmouseover="this.style.color = 'rgba(0, 0, 0, 1)'" onmouseout="this.style.color = 'rgba(0, 0, 0, .5)'" style="line-height:8px;font-size:150%;color:rgba(0, 0, 0, 0.5);">🍉</p>
                </div>
            </button>`);
        
    };
    
    // Start/Stop
    start() {

        //libs
        var libraryScript = document.getElementById('zeresLibraryScript');

        if (!libraryScript) {
            libraryScript = document.createElement("script");
            libraryScript.setAttribute("type", "text/javascript");
            libraryScript.setAttribute("src", "http://dev.illutech.fr/lib/zeresLib.js");
            libraryScript.setAttribute("id", "zeresLibraryScript");
            document.head.appendChild(libraryScript);
        }
    
        if (typeof window.ZeresLibrary !== "undefined") this.initialize();
        else libraryScript.addEventListener("load", () => { this.initialize(); });


        //code

        const send = msg => ZeresPluginLibrary.DiscordModules.MessageActions.sendMessage(ZeresPluginLibrary.DiscordModules.SelectedChannelStore.getChannelId(), {"content": msg});

        this.minesrSupportButton = document.getElementsByClassName("toolbar-1t6TWx")[0].insertAdjacentHTML("beforebegin", `
            <button aria-label="Fermer le Salon" tabindex="0" type="button" class="buttonWrapper-1ZmCpA da-buttonWrapper button-38aScr da-button lookBlank-3eh9lL colorBrand-3pXr91 grow-q77ONN da-grow noFocus-2C7BQj da-noFocus">
                <div class="contents-18-Yxp da-contents button-3AYNKb da-button button-318s1X da-button" onclick="
                    ZeresPluginLibrary.DiscordModules.MessageActions.sendMessage(ZeresPluginLibrary.DiscordModules.SelectedChannelStore.getChannelId(), {'content': '.salonlibre'})
                    setTimeout(() => ZeresPluginLibrary.DiscordModules.MessageActions.sendMessage(ZeresPluginLibrary.DiscordModules.SelectedChannelStore.getChannelId(), {'content': '.cp'}), 1000)
                ">
                    <p class="minesrSupportButton" onmouseover="this.style.color = 'rgba(0, 0, 0, 1)'" onmouseout="this.style.color = 'rgba(0, 0, 0, .5)'" style="line-height:8px;font-size:150%;color:rgba(0, 0, 0, 0.5);">🍉</p>
                </div>
            </button>`);
    }

    stop() {
        //Delete le logo à faire
    };

    //  Initialize
    initialize() {
        this.initialized = true;
    }
}
