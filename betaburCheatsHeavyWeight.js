// ==UserScript==
// @name         betaburCheatsHeavyWeight
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  You own the premium heavy weight version of this script!
// @author       dragonminja24
// @match        http*://*beta.avabur.com/game*
// @downloadURL  https://github.com/dragonminja24/betaburCheats/raw/master/betaburCheatsHeavyWeight.js
// @updateURL    https://github.com/dragonminja24/betaburCheats/raw/master/betaburCheatsHeavyWeight.js
// @grant        none
// Join the discord for configuration information:
// https://discord.gg/R6M55nB
// ==/UserScript==

(function($) {
    'use strict';
//After you configured all variables make a local copy of the configuration with the version so you have it for future updates
//All configurable variables and their function are explained on the discord ( search for the function like  manualHousing
    //Version 1.0.0
    // Independend
    let autoStamina = true
    let autoHarvestron = false
    let autoQuest = true
    let autoHousing = true

    // manualHousing
    let manualHousingBTN = false
    let item = 30
    let room = 0

    // autoWire
    let autoWire = true
    let wireName = 'dmii'
    let wireGoldCount = 5000000000
    let wireCrystalCount = 200
    let wirePlatCount = 1000000
    let wireFoodCount = 0
    let wireWoodCount = 0
    let wireIronCount = 0
    let wireStoneCount = 0
    let goldStock = 1000000000
    let crystalStock = 50
    let platinumStock = 100000
    let foodStock = 10000000
    let woodStock= 10000000
    let ironStock= 10000000
    let stoneStock= 10000000

    // chatCommand
    let ingredientWireName = 'dragonminja'
    let chatCommandChannel = 3104
    let Fishing = ["dmi","dmiii","dmiv","dmv","dmvi","dmvii"] // If you send your alts do TS all inside fishing go fishing
    let Woodcutting = ["dmviii","dmix","dmx","dmxi","dmxii","dmxiii"]
    let Mining = ["dmxv","dmxvi","dmxvii","dmxviii","dmxix","dmxx"]
    let Stonecutting = ["dmxxv","dmxxvi","dmxxvii","dmxxviii","dmxxix"]

    // event
    let eventCommandChannel = 3098
    let mainCharacter = ["dragonminja","dmii","dmxiv"]
    let primaryFood = [""]
    let primaryWood = [""]
    let primaryIron = [""]
    let primaryStone =[""]
    let primaryCraft =[""]
    let primaryCarve =["dmi","dmii","dmiii","dmiv","dmv","dmvi","dmvii","dmviii","dmvix","dmx","dmxi","dmxii","dmxiii","dmxiv","dmxv","dmxvi","dmxvii","dmxviii","dmxix","dmxx","dmxxv","dmxxvi","dmxxvii","dmxxviii","dmxxix","dragonminja"]
    let secondaryFood = ["dmi","dmiii","dmiv","dmv","dmvi","dmvii"]
    let secondaryWood = ["dmviii","dmix","dmx","dmxi","dmxii","dmxiii"]
    let secondaryIron = ["dmxv","dmxvi","dmxvii","dmxviii","dmxix","dmxx"]
    let secondaryStone = ["dmxxv","dmxxvi","dmxxvii","dmxxviii","dmxxix"]
    let secondaryCraft =["dmii","dragonminja","dmxiv"]
    let secondaryCarve = [""]
//If you paste your own configurations stop here ---------------------------------------------
//Don't touch anything below this point


//Chat command variables
    let myTS
    const tradeList = [Fishing,Woodcutting,Mining,Stonecutting]
    //Event related variables
    let msgID
    const fish = document.getElementsByClassName('bossHarvest btn btn-primary')[4]
    const wood = document.getElementsByClassName('bossHarvest btn btn-primary')[5]
    const iron = document.getElementsByClassName('bossHarvest btn btn-primary')[6]
    const stone =document.getElementsByClassName('bossHarvest btn btn-primary')[7]
    const craft = document.getElementsByClassName('bossCraft btn btn-primary')[0]
    const carve = document.getElementsByClassName('bossCarve btn btn-primary')[0]
    let buttonList = [fish,wood,iron,stone,craft,carve]
    let isMain = false
    let getTrade = [primaryFood,primaryWood,primaryIron,primaryStone,primaryCraft,primaryCarve]
    let getSecondaryTrade = [secondaryFood,secondaryWood,secondaryIron,secondaryStone,secondaryCraft,secondaryCarve]
    let mainTrade = 0 // 0 = food , 1 = wood , 2 = iron , 3 = stone , 4 = craft , 5 = carve
    let secondaryTrade = 0
    let eventId = null
    let eventLimiter = 0
    let carvingChanger = 0
    let mainChanger = 0
    let altChanger = 0
    let bossChanger = 0
    let mainEvent = false
    //UI related variables
    let msgCommandID
    let msgCombatID
    let msgTSID
    let msgWireID
    let username
    let checkArray
    let choices = [wireGoldCount +" gold" , wireCrystalCount+" crystals", wirePlatCount +" platinum", wireFoodCount +" food", wireWoodCount+" wood", wireIronCount+" iron", wireStoneCount+" stone"]
    //house related variables
    let built = false

//Random unspecified functions
    function getStartupParameters(){
       username = document.getElementById('username').innerHTML
        if(username == wireName){
            autoWire = false
        }

        checkArray = [autoStamina,autoHarvestron,autoQuest,autoWire,autoHousing,manualHousingBTN]
        for(let i=0; i<checkArray.length; i++){
            if(checkArray[i]){
                checkArray[i] = "checked"
            }else{
                checkArray[i] = ""
            }
        }

        if(wireName == ''){
            wireName = 'dragonminja'
        }
    }
    //Some fancy promise timeOut shit
    function delay(time){
        return new Promise((resolve,reject) => {
            setTimeout( resolve , time )
        })
    }
//Fuck you Vysn for your american number notation.
     function split(n){
        let count = n.length/4; let position = count % 1; let subString = ""; let index1; let index2
        if(position == 0.25){ subString += n.substring(0,1); index1 = 2; index2 = 5; }
        if(position == 0.5){ subString+= n.substring(0,2); index1 = 3; index2 = 6; }
        if(position == 0.75){subString+= n.substring(0,3); index1 = 4; index2 = 7; }
        for(let i=0; i<count; i++){
            if(position == 0.25) { subString += n.substring(index1,index2) }
            if(position == 0.5) { subString += n.substring(index1,index2) }
            if(position == 0.75){ subString += n.substring(index1,index2) }
            index1 += 4; index2 += 4;
        }
        return subString
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
//AUTO WIRE SECTION----------------------------------------------------------------------------------
    function automaticWire(){
        return new Promise((resolve,reject) => {
            if(autoWire){
                let crystalCount = document.getElementsByClassName('right mypremium crystals')[0].getAttribute('data-personal')
                let possible = [false,false,false,false,false,false,false]
                if(wireGoldCount != 0 && (wireGoldCount + goldStock) <= split(document.getElementsByClassName('right mygold gold')[0].getAttribute('data-personal'))){
                    possible[0] = true
                }
                if(wireCrystalCount != 0 && (wireCrystalCount + crystalStock) <= split(document.getElementsByClassName('right mypremium crystals')[0].getAttribute('data-personal'))){
                    possible[1] = true
                }
                if(wirePlatCount != 0 && (wirePlatCount + platinumStock ) <= split(document.getElementsByClassName('right myplatinum platinum')[0].getAttribute('data-personal'))){
                    possible[2] = true
                }
                if(wireFoodCount != 0 && (wireFoodCount + foodStock) <= split(document.getElementsByClassName('right myfood food')[0].getAttribute('data-personal'))){
                    possible[3] = true
                }
                if(wireWoodCount != 0 && (wireWoodCount + woodStock) <= split(document.getElementsByClassName('right mywood wood')[0].getAttribute('data-personal'))){
                    possible[4] = true
                }
                if(wireIronCount != 0 && (wireIronCount + ironStock) <= split(document.getElementsByClassName('right myiron iron')[0].getAttribute('data-personal'))){
                    possible[5] = true
                }
                if(wireStoneCount != 0 && (wireStoneCount + stoneStock) <= split(document.getElementsByClassName('right mystone stone')[0].getAttribute('data-personal'))){
                    possible[6] = true
                }
                let wireMessage = "/wire "+wireName+" "
                let trueCount = 0
                let pointer = -1
                let firstTrue = null

                possible.forEach((element) => { // how many trues and which is the first one
                    ++pointer
                    if(element){
                        ++trueCount
                        if(trueCount == 1){
                            firstTrue = pointer
                        }
                    }
                })

                if(firstTrue != null){
                    wireMessage += choices[firstTrue]

                    if(firstTrue < possible.length-1){
                        for( let i=firstTrue+1; i<possible.length; i++){
                            if(possible[i]){
                                wireMessage += " , " + choices[i]
                            }
                        }
                    }
                }

                if(firstTrue != null){
                    $("#chatMessage").html(wireMessage)
                    $('#chatSendMessage').click()
                }
            }
            resolve()
        })
    }

    async function chatCommands(){
        return new Promise(async(resolve,reject) => {

            if($('li[data-channel='+chatCommandChannel+']').length > 0){
                let msg = $('li[data-channel='+chatCommandChannel+']')[0].innerHTML
                msgCommandID =$('li[data-channel='+chatCommandChannel+']')[0].id
                let msgIng = null
                let msgTS= null
                let msgComb = null

                if(msg != null){
                    msgIng = msg.substring(msg.length-22 , msg.length-7)
                    msgComb = msg.substring(msg.length-15 , msg.length-7)
                    msgTS = msg.substring(msg.length-11 , msg.length-7)
                }

                if(msgIng == "wireIngredients" && msgWireID != msgCommandID ){
                    if(document.getElementById('username').innerHTML != ingredientWireName){
                        msgWireID = msgCommandID
                        $('#inventory').click()
                        await delay(5000)
                        $('button[data-itemtype="ingredient"]').click()
                        await delay(8000)
                        $('#ingredient-wire-to').val(ingredientWireName)
                        await delay(200)
                        $('#ingredient-wire-max-all').click()
                        await delay(100)
                        $('#ingredient-wire-send').click()
                    }
                }else if (msgComb == "doCombat" && msgCombatID != msgCommandID ){
                    msgCombatID = msgCommandID
                    $('#autoEnemy').click()
                    await delay(500)
                }else if (msgTS == "doTS" && msgTSID != msgCommandID ){
                    msgTSID = msgCommandID
                    if(myTS != null){
                        document.getElementsByClassName('loadHarvesting')[myTS].click()
                    }
                }
            }
            resolve()
        })
    }

//EVENT SECTION---------------------------------------------------------------------
    function assignTrade(trade,id){
        let pointer = 0
        trade.forEach((list) => {
            list.forEach((element) => {
                if(username == element){
                    if(id == 0){
                        mainTrade = pointer
                    }
                    if(id == 1){
                        secondaryTrade = pointer
                    }
                    if(id == 2){
                        myTS = pointer
                    }
                }
            })
                ++pointer
        })
    }

    function isMainCharacter(){
        mainCharacter.forEach((element) => {
            if(username == element){
                isMain = true
            }
        })
    }

    function changeTrade(id){
        let time = $('#eventCountdown')[0].innerHTML
        if($('#currentBossCarvingTier')[0].innerHTML > 2500 && carvingChanger == 0 && !mainEvent){
            ++carvingChanger
            if(secondaryTrade != 5){
                buttonList[secondaryTrade].click()
            }else{
                document.getElementsByClassName('bossFight btn btn-primary')[0].click()
            }
        }
        if(isMain){
            if(time.includes("03m") && mainChanger == 0){
                ++mainChanger
                buttonList[secondaryTrade].click()
            }
            if(time.includes("02m") && bossChanger == 0){
                ++bossChanger
                document.getElementsByClassName('bossFight btn btn-primary')[0].click()
            }
        }else{
            if(time.includes("02m") && altChanger == 0){
                ++altChanger
                buttonList[secondaryTrade].click()
            }
        }

        if(time.includes("01m")){
            if(!isMain){
                if(!mainEvent){
                    document.getElementsByClassName('bossFight btn btn-primary')[0].click()
                }
            }
            $("#eventCountdown").unbind()
            carvingChanger = 0
            mainChanger = 0
            bossChanger = 0
            altChanger = 0
            mainEvent = false
        }
    }

    async function joinEvent(){
        if(eventLimiter == 0){
            ++eventLimiter
            let msg
            let msgsub
            if($('li[data-channel='+eventCommandChannel+']').length > 0){
                msg = $('li[data-channel='+eventCommandChannel+']')[0].innerHTML
                msgID = $('li[data-channel='+eventCommandChannel+']')[0].id
                msgsub = null
            }

            if(msg != null){
                msgsub = msg.substring(msg.length-16 , msg.length-7)
            }

            if(msgsub != null){
                if(msgID != eventId){
                    if(msgsub == 'InitEvent' || msgsub =='MainEvent'){
                        if(msgsub == 'MainEvent'){
                            mainEvent = true
                        }else{
                            mainEvent = false
                        }
                        eventId = msgID
                        buttonList[mainTrade].click()
                        await delay(70000)
                        $('#eventCountdown').bind("DOMSubtreeModified", changeTrade); // everyone else
                    }
                }
            }
            await delay(5000)
            eventLimiter = 0
        }
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
<input type="checkbox" id="autoHousing" `+ checkArray[4] + ` style="margin-left: 2%;">Auto Housing</input>
<input type="text"  id="itemTB" value=`+item +`  style="width:10%; margin-left: 2%;">ItemID</input>
<input type="text"  id="roomTB" value=`+room +`  style="width:10%; margin-left: 2%;">RoomID</input>
<input type="checkbox" id="manualHousingBTN" `+ checkArray[5] + ` style="margin-left: 2%;">Set Manual Item</input>
</li>
<li>
Auto Wire</br>
<input type="text"  id="goldTB" value=`+wireGoldCount +`  style="width:10%; margin-left: 2%;">Gold</input></br>
<input type="text"  id="crystalTB" value=`+wireCrystalCount +`  style="width:10%; margin-left: 2%;">Crystals</input></br>
<input type="text"  id="platinumTB" value=`+wirePlatCount +`  style="width:10%; margin-left: 2%;">Platinum</input></br>

<input type="text"  id="fishTB" value=`+wireFoodCount +`  style="width:10%; margin-left: 2%;">Food</input></br>
<input type="text"  id="woodTB" value=`+wireWoodCount +`  style="width:10%; margin-left: 2%;">Wood</input></br>
<input type="text" id="ironTB" value=`+wireIronCount +`  style="width:10%; margin-left: 2%;">Iron</input></br>
<input type="text" id="stoneTB" value=`+wireStoneCount +`  style="width:10%; margin-left: 2%;">Stone</input><br>to</br>
<input type="text" id="nameTB" value=`+ wireName +`  style="width:20%; margin-left: 2%;"></input>
<input type="checkbox" id="autoWire" `+ checkArray[3] + ` style="margin-left: 2%;">Auto Wire</input>
</li>
</ul>
</h4>
</div>`)
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

    $(document).on('click', 'input#manualHousingBTN', function(event) {
        manualHousingBTN = document.getElementById('manualHousingBTN').checked
    })

    $(document).on('click', 'input#autoQuest', function(event) {
        autoQuest =document.getElementById('autoQuest').checked
    })

    $(document).on('click', 'input#autoHarvestron', function(event) {
        autoHarvestron =document.getElementById('autoHarvestron').checked
    })

    $(document).on('click', 'input#autoWire', function(event) {
        autoWire = document.getElementById('autoWire').checked
    })

    $(document).on('click', 'input#goldTB', function(event) {
        wireGoldCount = document.getElementById('goldTB').value
    })

    $(document).on('change', 'input#crystalTB', function(event) {
        wireCrystalCount = document.getElementById('crystalTB').value
    })

    $(document).on('change', 'input#itemTB', function(event) {
        item = document.getElementById('itemTB').value
    })


    $(document).on('change', 'input#roomTB', function(event) {
        room = document.getElementById('roomTB').value
    })

    $(document).on('change', 'input#platinumTB', function(event) {
        wirePlatCount = document.getElementById('platinumTB').value
    })

    $(document).on('change', 'input#fishTB', function(event) {
        wireFoodCount = document.getElementById('fishTB').value
    })

    $(document).on('change', 'input#woodTB', function(event) {
        wireWoodCount = document.getElementById('woodTB').value
    })

    $(document).on('change', 'input#ironTB', function(event) {
        wireIronCount = document.getElementById('ironTB').value
    })

    $(document).on('change', 'input#stoneTB', function(event) {
        wireStoneCount = document.getElementById('stoneTB').value
    })

    $(document).on('change', 'input#nameTB', function(event) {
        wireName = document.getElementById('nameTB').value
    })
//HOUSING SECTION ----------------------------------------------------------------------

    async function manualHousing(){
        return new Promise(async(resolve,reject) => {
            await delay(5000)
            $('#allHouseUpgrades').click()
            await delay(7500)
            $("a[data-itemtype="+item+"]a[ data-roomtype="+room+"]").click()
            await delay(5000)
            $('#houseRoomItemUpgradeLevel').click()
            await delay(4000)
            $('span.closeModal')[0].click()
            await delay(4000)
            resolve()
        })
    }

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
                    if(!manualHousingBTN){
                        buildRoom()
                        if(!built){
                            await delay(3500)
                            $( "#houseQuickBuildList li:nth-child(1) a:nth-child(2)")[0].click()
                            await delay(5000)
                            buildRoomItem()
                            if(!built){
                                upgradeItemTier()
                            }
                            if(!built){
                                $('#houseRoomItemUpgradeLevel').click()
                            }
                            await delay(4000)
                            $('span.closeModal')[0].click()
                            built = false
                        }else{
                            await delay(4000)
                            built = false
                        }
                    }else{
                        await manualHousing()
                    }
                }
                await delay(4000)
            }
            resolve()
        })
    }

    function handleHarvestron() {
        return new Promise(async(resolve,reject) => {
            if(autoHarvestron){
                if(document.getElementById('harvestronNotifier').style.display != "none"){
                    $('#harvestronNotifier').click()
                    await delay(5000)
                    $('#houseHarvestingJobStart').click()
                    await delay(4000)
                    $('span.closeModal')[0].click()
                    await delay(4000)
                }
            }
            resolve()
        })
    }
    //-------------------------------------------------------------------------
    function setupCSSObserver(){
        let modalListener = document.querySelector('#modalWrapper')
        let chatListener = document.querySelector('#chatMessageList')

        let observerChat = new MutationObserver(function(mutations) {
            mutations.forEach(async function(mutation) {
                await delay(4000)
                joinEvent()
            })
        })

        let observerModal = new MutationObserver(function(mutations) {
            mutations.forEach(async function(mutation) {
                changeDisplay()
            })
        })

        var c1 = { attributes: true, childList: true, characterData: true };
        observerChat.observe(chatListener,c1);
        observerModal.observe(modalListener,c1);
    }
//Script Loops----------------------------------------------
    async function primaryLoop(){
        await delay(30000)
        await automaticWire()
        await checkStamina()
        primaryLoop()
    }

    async function secondaryLoop(){
        await delay(30000)
        await handleHousing()
        await handleHarvestron()
        await checkQuest()
        await chatCommands()
        secondaryLoop()
    }
//--------------------------------------------------------
    async function init(){
        primaryLoop()
        secondaryLoop()
        await delay(8000)
        getStartupParameters()
        setupCSSObserver()
        assignTrade(getTrade,0)
        assignTrade(getSecondaryTrade,1)
        assignTrade(tradeList,2)
        isMainCharacter()
        buildUI()
    }
    init()
})(jQuery);
