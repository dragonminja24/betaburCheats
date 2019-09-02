// ==UserScript==
// @name         betaburCheatsLightweight
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  You own the lightweight version of this script!
// @author       dragonminja24
// @match        http*://*beta.avabur.com/game*
// @grant        none
// @downloadURL  https://github.com/dragonminja24/betaburCheats/raw/master/betaburCheatsLightweight.js
// @updateURL    https://github.com/dragonminja24/betaburCheats/raw/master/betaburCheatsLightweight.js
// Join the discord for configuration information:
// https://discord.gg/R6M55nB
// ==/UserScript==

(function($) {
    'use strict';
// The following Sections include variables you want to adjust before running the script initially!
//Configuration - General--------------------------------------------------------------------------
    let autoStamina = true
    let autoHarvestron = true
    let autoQuest = true
    let autoHousing = true
//Stop here! No more changing of variables below this point!------------------------------------

//UI related variables
    let checkArray
//house related variables
    let built = false
    //Some fancy promise timeOut shit
    function delay(time){
        return new Promise((resolve,reject) => {
            setTimeout( resolve , time )
        })
    }
//Setup UI stuff
     function getStartupParameters(){

        checkArray = [autoStamina,autoHarvestron,autoQuest,autoHousing]
        for(let i=0; i<checkArray.length; i++){
            if(checkArray[i]){
                checkArray[i] = "checked"
            }else{
                checkArray[i] = ""
            }
        }
    }
//STAMINA SECTION----------------------------------------------------------
    function checkStamina(){
        return new Promise((resolve,reject) => {
            if(autoStamina){
                if(document.getElementById('autosRemaining').innerHTML <= 20){
                    $('#replenishStamina').click()
                }
            }
            resolve()
        })
    }
//QUEST SECTION-----------------------------------------------------------
    function questProcedure(i){
        return new Promise(async(resolve,reject) => {
            $('input.completeQuest')[i].click()
            await delay(5000)
            document.getElementsByClassName('quest_crystal_guess')[i].value = document.getElementsByClassName('max_quest_crystals')[0].innerHTML
            $('input.questRequest')[i].click()
            await delay(5000)
            $('span.closeModal')[0].click()
            await delay(2000)
            resolve()
        })
    }

    async function questBackup(i){
        return new Promise(async(resolve,reject) => {
            document.getElementsByClassName('quest_crystal_guess')[i].value = document.getElementsByClassName('max_quest_crystals')[0].innerHTML
            $('input.questRequest')[i].click()
            await delay(3500)
            $('span.closeModal')[0].click()
            await delay(2000)
            resolve()
        })
    }

    function checkQuest(){
        return new Promise(async(resolve,reject) => {
            if(autoQuest){
                let noQuest = true // if this stays true the backup strat will hook up
                if(document.getElementById('battleQuestRemaining').innerHTML == 0){ // check for all types of quests
                    noQuest = false
                    await questProcedure(0)
                }else if(document.getElementById('tradeskillQuestRemaining').innerHTML == 0){
                    noQuest = false
                    await questProcedure(1)
                }else if(document.getElementById('professionQuestRemaining').innerHTML == 0){
                    noQuest = false
                    await questProcedure(2)
                }

                if(noQuest){
                    if(document.getElementById('bq_info').innerHTML.includes("You don't currently have a")){ // quest backup if you have no quest at all ( procedure interrupted e.g.)
                        await questBackup(0)
                    }else if(document.getElementById('tq_info').innerHTML.includes("You don't currently have a")){
                        await questBackup(1)
                    }else if(document.getElementById('pq_info').innerHTML.includes("You don't currently have a")){
                        await questBackup(2)
                    }
                }
            }
            resolve()
        })
    }

//UI Section---------------------------------------------------------------------------------------------
    function buildUI(){
        $("#chatWrapper").prepend(`
<a id="cheatOverlay">betabur Cheats</a>
`)
        $('#modalContent').append(`
<ul id="cheatContainer" style="color:teal; display:none">
<li>
<input type="checkbox" id="autoStamina"`+ checkArray[0] + ` style="margin-left: 2%;">Auto Replenish</input>
<input type="checkbox" id="AutoHarvestron" `+ checkArray[1] + ` style="margin-left: 2%;">Auto Harvestron</input>
<input type="checkbox" id="autoQuest" `+ checkArray[2] + ` style="margin-left: 2%;">Auto Questing</input></br>
<input type="checkbox" id="autoHousing" `+ checkArray[3] + ` style="margin-left: 2%;">Auto Housing</input>
</li>
</ul>
`)
    }

    function changeDisplay(){
        if(document.getElementById('modalWrapper').style.display == 'none'){
            document.getElementById('cheatContainer').style.display = 'none'
        }
    }

    $(document).on('click', 'a#cheatOverlay', function(event) {
        $('#inventory').click()
        document.getElementById('modalTitle').innerHTML = 'CheatsOfBetabur'
        document.getElementById('inventoryWrapper').style.display = 'none'
        document.getElementById('cheatContainer').style.display = 'block'
    })

    $(document).on('click', 'input#autoStamina', function(event) {
        autoStamina =document.getElementById('autoStamina').checked
    })

    $(document).on('click', 'input#autoHousing', function(event) {
        autoHousing =document.getElementById('autoHousing').checked
    })

    $(document).on('click', 'input#autoQuest', function(event) {
        autoQuest =document.getElementById('autoQuest').checked
    })

    $(document).on('click', 'input#autoHarvestron', function(event) {
        autoHarvestron =document.getElementById('autoHarvestron').checked
    })

//HOUSING SECTION ----------------------------------------------------------------------
    function buildRoom(){
        if(document.getElementById('houseRoomPossibilities').innerHTML != ""){
            $('#houseBuildRoom').click()
            built = true
        }
    }

    function buildRoomItem(){
        if(document.getElementById('houseRoomItemPossibilities').innerHTML != ""){
            $('#houseBuildRoomItem').click()
            built = true
        }
    }

    function upgradeItemTier(){
        if(document.getElementById('houseRoomItemUpgradeTierWrapper').style.display != "none"){
            $('#houseRoomItemUpgradeTier').click()
            built = true
        }
    }

    async function handleHousing(){
        return new Promise(async(resolve,reject) => {
            if(autoHousing){
                if(document.getElementById('constructionNotifier').style.display != "none"){
                    $('#constructionNotifier').click()
                        buildRoom()
                        if(!built){
                            await delay(3500)
                            $( "#houseQuickBuildList li:nth-child(1) a:nth-child(2)")[0].click()
                            await delay(3500)
                            buildRoomItem()
                            upgradeItemTier()
                            if(!built){
                                $('#houseRoomItemUpgradeLevel').click()
                            }
                            await delay(2000)
                            $('span.closeModal')[0].click()
                            built = false
                        }else{
                            await delay(2000)
                            built = false
                        }
                }
                await delay(2000)
            }

            resolve()
        })
    }

    function handleHarvestron() {
        return new Promise(async(resolve,reject) => {
            if(autoHarvestron){
                if(document.getElementById('harvestronNotifier').style.display != "none"){
                    $('#harvestronNotifier').click()
                    await delay(3500)
                    $('#houseHarvestingJobStart').click()
                    await delay(2000)
                    $('span.closeModal')[0].click()
                    await delay(2000)
                }
            }
            resolve()
        })
    }
    //-------------------------------------------------------------------------
    function setupCSSObserver(){
        let modalListener = document.querySelector('#modalWrapper')
        let observerModal = new MutationObserver(function(mutations) {
            mutations.forEach(async function(mutation) {
                changeDisplay()
            })
        })
        var c1 = { attributes: true, childList: true, characterData: true };
        observerModal.observe(modalListener,c1);
    }
//Script Loops----------------------------------------------
    async function primaryLoop(){
        await delay(30000)
        await checkStamina()
        primaryLoop()
    }

    async function secondaryLoop(){
        await delay(30000)
        await handleHousing()
        await handleHarvestron()
        await checkQuest()
        secondaryLoop()
    }
//--------------------------------------------------------
    async function init(){
        primaryLoop()
        secondaryLoop()
        await delay(5000)
        getStartupParameters()
        setupCSSObserver()
        buildUI()
    }
    init()
})(jQuery);
