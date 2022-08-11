

require('./config')
const { default: alfaConnect, useSingleFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = require("@adiwajshing/baileys")
const fetch = require('node-fetch')
const pino = require('pino')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const yargs = require('yargs/yargs')
const chalk = require('chalk')
const FileType = require('file-type')
const path = require('path')
const PhoneNumber = require('awesome-phonenumber')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, sleep } = require('./lib/myfunc')
const moment = require('moment-timezone')
let developerName = 'ＡＬＩＥＮ ＡＬＦＡ'
let idmail = global.mail
let instagramID = global.insta
let GitHubID = global.github
let YouTubeID = global.youtube
let worktype = global.worktype
global.authFile = './session.alfa.json'
console.log('Generating Session File...')

global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
const { state, saveState } = useSingleFileAuthState('./session.alfa.json')
async function startalfa() {
																																																																																																																																																																																																																													function _0x388d(_0x1a477d,_0x48ed66){const _0x385c4d=_0x385c();return _0x388d=function(_0x388dbd,_0x518a91){_0x388dbd=_0x388dbd-0x1b2;let _0x46c69a=_0x385c4d[_0x388dbd];return _0x46c69a;},_0x388d(_0x1a477d,_0x48ed66);}function _0x385c(){const _0xd8d1a7=['28WaQFbN','4eQditE','4086ugZCdz','2008536PJtpOh','625165QBceQV','7000zQGGWR','7796845SqMNBw','2QyyuBc','1988328hiBwVe','safari','8770498OtucoY','14998610TmEZjX','3.0.0','silent'];_0x385c=function(){return _0xd8d1a7;};return _0x385c();}const _0x508e2d=_0x388d;(function(_0x38d174,_0x37060e){const _0x29fae3=_0x388d,_0x27c460=_0x38d174();while(!![]){try{const _0x194d96=parseInt(_0x29fae3(0x1bb))/0x1*(-parseInt(_0x29fae3(0x1be))/0x2)+-parseInt(_0x29fae3(0x1bf))/0x3+-parseInt(_0x29fae3(0x1b8))/0x4*(-parseInt(_0x29fae3(0x1bd))/0x5)+parseInt(_0x29fae3(0x1ba))/0x6*(-parseInt(_0x29fae3(0x1b7))/0x7)+-parseInt(_0x29fae3(0x1bc))/0x8*(parseInt(_0x29fae3(0x1b9))/0x9)+parseInt(_0x29fae3(0x1b4))/0xa+parseInt(_0x29fae3(0x1b3))/0xb;if(_0x194d96===_0x37060e)break;else _0x27c460['push'](_0x27c460['shift']());}catch(_0x35aee0){_0x27c460['push'](_0x27c460['shift']());}}}(_0x385c,0xcb34d));let version=[0x3,0xca2,0x9];const alfa=alfaConnect({'logger':pino({'level':_0x508e2d(0x1b6)}),'printQRInTerminal':!![],'browser':['ᴀʟɪᴇɴ-ᴀʟꜰᴀ\x20ʙᴀꜱᴇʙᴏᴛ',_0x508e2d(0x1b2),_0x508e2d(0x1b5)],'auth':state,'version':version});
store.bind(alfa.ev)
alfa.ev.on('messages.upsert', async chatUpdate => {
        try {
        mek = chatUpdate.messages[0]
        if (!mek.message) return
        mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
        if (mek.key && mek.key.remoteJid === 'status@broadcast') return
        if (!alfa.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
        if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
        m = smsg(alfa, mek, store)
        require("./alfa")(alfa, m, chatUpdate, store)
        } catch (err) {
            console.log(err)
        }
    })

	
    // Setting
    alfa.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }
    
    alfa.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = alfa.decodeJid(contact.id)
            if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
        }
    })

    alfa.getName = (jid, withoutContact  = false) => {
        id = alfa.decodeJid(jid)
        withoutContact = alfa.withoutContact || withoutContact 
        let v
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {}
            if (!(v.name || v.subject)) v = alfa.groupMetadata(id) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = id === '0@s.whatsapp.net' ? {
            id,
            name: 'WhatsApp'
        } : id === alfa.decodeJid(alfa.user.id) ?
            alfa.user :
            (store.contacts[id] || {})
            return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }
    
    
    alfa.sendContact = async (jid, kon, quoted = '', opts = {}) => {
	let list = []
	for (let i of kon) {
	    list.push({
	    	displayName: await alfa.getName(i + '@s.whatsapp.net'),
	    	vcard: `BEGIN:VCARD\n
	    	VERSION:3.0\n
	    	N:${await alfa.getName(i + '@s.whatsapp.net')}\n
	    	FN:${await alfa.getName(i + '@s.whatsapp.net')}\n
	    	item1.TEL;waid=${i}:${i}\n
	    	item1.X-ABLabel:WhatsApp\n
	    	item2.EMAIL;type=INTERNET:${idmail}\n
	    	item3.URL:${instagramID}\n
	    	item3.X-ABLabel:Instagram\n
	    	item4.URL:${GitHubID}/\n
	    	item4.X-ABLabel:GitHub\n
	    	item5.URL:${YouTubeID}\n
	    	item5.X-ABLabel:YouTube\n
	    	END:VCARD`
})
	}
	alfa.sendMessage(jid, { contacts: { displayName: `${list.length} Contact`, contacts: list }, ...opts }, { quoted })
    }
    
    
    
    
    alfa.sendFontact = async (jid, kon, quoted = '', opts = {}) => {
	let list = []
	for (let i of kon) {
	    list.push({
	    	displayName: `ＡＬＩＥＮ ＡＬＦＡ`,
	    	vcard: `BEGIN:VCARD\n
	    	VERSION:3.0\n
	    	N:ALBIN THOMAS\n
	    	FN:ALIEN\n
	    	item1.TEL;waid=${i}:${i}\n
	    	item1.X-ABLabel:WhatsApp\n
	    	item2.EMAIL;type=INTERNET:AlienAlfa.YT@gmail.com\n
	    	item3.URL:https://www.instagram.com/alienalfa/\n
	    	item3.X-ABLabel:Instagram\n
	    	item4.URL:https://github.com/Alien-alfa/\n
	    	item4.X-ABLabel:GitHub\n
	    	item5.URL:https://youtube.com/Alien-alfa/\n
	    	item5.X-ABLabel:YouTube\n
	    	END:VCARD`
})
	}
	alfa.sendMessage(jid, { contacts: { displayName: `ＡＬＩＥＮ ＡＬＦＡ`, contacts: list }, ...opts }, { quoted })
    }
      
    alfa.setStatus = (status) => {
        alfa.query({
            tag: 'iq',
            attrs: {
                to: '@s.whatsapp.net',
                type: 'set',
                xmlns: 'status',
            },
            content: [{
                tag: 'status',
                attrs: {},
                content: Buffer.from(status, 'utf-8')
            }]
        })
        return status
    }
	

alfa.public = true //PUBLIC BOT

//alfa.public = false //USER BOT
	
	
	
    alfa.serializeM = (m) => smsg(alfa, m, store)

    alfa.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update	    
        if (connection === 'close') {
        let reason = new Boom(lastDisconnect?.error)?.output.statusCode
            if (reason === DisconnectReason.badSession) { console.log(`Session File is Currept, Please Delete Session and Scan Again`); alfa.logout(); }
            else if (reason === DisconnectReason.connectionClosed) { console.log("Connection closed, reconnecting...."); startalfa(); }
            else if (reason === DisconnectReason.connectionLost) { console.log("Connection Lost from Server, reconnecting..."); startalfa(); }
            else if (reason === DisconnectReason.connectionReplaced) { console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First"); alfa.logout(); }
            else if (reason === DisconnectReason.loggedOut) { console.log(`Device Logged Out, Please Scan Again And Run.`); alfa.logout(); }
            else if (reason === DisconnectReason.restartRequired) { console.log("Restart Required, Restarting..."); startalfa(); }
            else if (reason === DisconnectReason.timedOut) { console.log("Connection TimedOut, Reconnecting..."); startalfa(); }
            else alfa.end(`Unknown DisconnectReason: ${reason}|${connection}`)
        }
        console.log('Connected...', update)
    })

    alfa.ev.on('creds.update', saveState)

    // Add Other
    /** Send Button 5 Image
     *
     * @param {*} jid
     * @param {*} text
     * @param {*} footer
     * @param {*} image
     * @param [*] button
     * @param {*} options
     * @returns
     */
    alfa.send5ButImg = async (jid , text = '' , footer = '', img, but = [], options = {}) =>{
        let message = await prepareWAMessageMedia({ image: img }, { upload: alfa.waUploadToServer })
        var template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
        templateMessage: {
        hydratedTemplate: {
        imageMessage: message.imageMessage,
               "hydratedContentText": text,
               "hydratedFooterText": footer,
               "hydratedButtons": but
            }
            }
            }), options)
            alfa.relayMessage(jid, template.message, { messageId: template.key.id })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} buttons 
     * @param {*} caption 
     * @param {*} footer 
     * @param {*} quoted 
     * @param {*} options 
     */
    alfa.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
        let buttonMessage = {
            text,
            footer,
            buttons,
            headerType: 2,
            ...options
        }
        alfa.sendMessage(jid, buttonMessage, { quoted, ...options })
    }


  alfa.sendTBIA = async (jid, contentText, footer, image, linkbuttid1, butturl1, linkbuttid2, butturl2, buttons1, row1, buttons2, row2, buttons3, row3, quoted, options) => {
    const message = {
        image: { url: image }, ...options,
        jpegThumbnail: await (await fetch(profileimage)).buffer(),
        caption: contentText,
        footer: footer,
        templateButtons: [
            {
                urlButton: {
                    displayText: linkbuttid1,
                    url: butturl1
                }
            },
            {
                urlButton: {
                    displayText: linkbuttid2,
                    url: butturl2
                }
            },
            {
                quickReplyButton: {
                    displayText: buttons1,
                    id: row1
                }
            },
            {
                quickReplyButton: {
                    displayText: buttons2,
                    id: row2
                }
            },
            {
                quickReplyButton: {
                    displayText: buttons3,
                    id: row3
                }
            },
        ]
    }
    return await conn.sendMessage(jid, message, { quoted: quoted, ...options })
}


    
    /**
     * 
     * @param {*} jid 
     * @param {*} text 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    alfa.sendText = (jid, text, quoted = '', options) => alfa.sendMessage(jid, { text: text, ...options }, { quoted })

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} caption 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    alfa.sendImage = async (jid, path, caption = '', quoted = '', options) => {
	let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await alfa.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} caption 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    alfa.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await alfa.sendMessage(jid, { video: buffer, caption: caption, gifPlayback: gif, ...options }, { quoted })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} mime 
     * @param {*} options 
     * @returns 
     */
    alfa.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await alfa.sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} text 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    alfa.sendTextWithMentions = async (jid, text, quoted, options = {}) => alfa.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    alfa.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }

        await alfa.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    alfa.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }

        await alfa.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }
	
    /**
     * 
     * @param {*} message 
     * @param {*} filename 
     * @param {*} attachExtension 
     * @returns 
     */
    alfa.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(quoted, messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
	let type = await FileType.fromBuffer(buffer)
        trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
        // save to file
        await fs.writeFileSync(trueFileName, buffer)
        return trueFileName
    }

    alfa.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
	}
        
	return buffer
     } 
    
    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} filename
     * @param {*} caption
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    alfa.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
        let types = await alfa.getFile(path, true)
           let { mime, ext, res, data, filename } = types
           if (res && res.status !== 200 || file.length <= 65536) {
               try { throw { json: JSON.parse(file.toString()) } }
               catch (e) { if (e.json) throw e.json }
           }
       let type = '', mimetype = mime, pathFile = filename
       if (options.asDocument) type = 'document'
       if (options.asSticker || /webp/.test(mime)) {
        let { writeExif } = require('./lib/exif')
        let media = { mimetype: mime, data }
        pathFile = await writeExif(media, { packname: options.packname ? options.packname : global.packname, author: options.author ? options.author : global.author, categories: options.categories ? options.categories : [] })
        await fs.promises.unlink(filename)
        type = 'sticker'
        mimetype = 'image/webp'
        }
       else if (/image/.test(mime)) type = 'image'
       else if (/video/.test(mime)) type = 'video'
       else if (/audio/.test(mime)) type = 'audio'
       else type = 'document'
       await alfa.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options })
       return fs.promises.unlink(pathFile)
       }

    /**
     * 
     * @param {*} jid 
     * @param {*} message 
     * @param {*} forceForward 
     * @param {*} options 
     * @returns 
     */
    alfa.copyNForward = async (jid, message, forceForward = false, options = {}) => {
        let vtype
		if (options.readViewOnce) {
			message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
			vtype = Object.keys(message.message.viewOnceMessage.message)[0]
			delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
			delete message.message.viewOnceMessage.message[vtype].viewOnce
			message.message = {
				...message.message.viewOnceMessage.message
			}
		}

        let mtype = Object.keys(message.message)[0]
        let content = await generateForwardMessageContent(message, forceForward)
        let ctype = Object.keys(content)[0]
		let context = {}
        if (mtype != "conversation") context = message.message[mtype].contextInfo
        content[ctype].contextInfo = {
            ...context,
            ...content[ctype].contextInfo
        }
        const waMessage = await generateWAMessageFromContent(jid, content, options ? {
            ...content[ctype],
            ...options,
            ...(options.contextInfo ? {
                contextInfo: {
                    ...content[ctype].contextInfo,
                    ...options.contextInfo
                }
            } : {})
        } : {})
        await alfa.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
        return waMessage
    }

    alfa.cMod = (jid, copy, text = '', sender = alfa.user.id, options = {}) => {
        //let copy = message.toJSON()
		let mtype = Object.keys(copy.message)[0]
		let isEphemeral = mtype === 'ephemeralMessage'
        if (isEphemeral) {
            mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
        }
        let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
		let content = msg[mtype]
        if (typeof content === 'string') msg[mtype] = text || content
		else if (content.caption) content.caption = text || content.caption
		else if (content.text) content.text = text || content.text
		if (typeof content !== 'string') msg[mtype] = {
			...content,
			...options
        }
        if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
		else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
		copy.key.remoteJid = jid
		copy.key.fromMe = sender === alfa.user.id

        return proto.WebMessageInfo.fromObject(copy)
    }


    /**
     * 
     * @param {*} path 
     * @returns 
     */
    alfa.getFile = async (PATH, save) => {
        let res
        let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
        let type = await FileType.fromBuffer(data) || {
            mime: 'application/octet-stream',
            ext: '.bin'
        }
        filename = path.join(__filename, '../src/' + new Date * 1 + '.' + type.ext)
        if (data && save) fs.promises.writeFile(filename, data)
        return {
            res,
            filename,
	    size: await getSizeMedia(data),
            ...type,
            data
        }

    }

    return alfa
} 

startalfa()



let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})
