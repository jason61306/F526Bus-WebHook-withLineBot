/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
		async function gatherResponse(response) {
			const { headers } = response;
			const contentType = headers.get("content-type") || "";
			if (contentType.includes("application/json")) {
			  return await response.json();
			}
			return response.text();
		}
		const url = "https://pda.5284.gov.taipei/MQS/StopDyna?stopid=160024";
		const init = {
			headers: {
			  "content-type": "application/json;charset=UTF-8",
			},
		};		
		const response = await fetch(url, init);
		const data = await gatherResponse(response);		
		var TTEMap = {'0':'進站中','':'未發車','-1':'未發車','-2':'交管不停','-3':'末班已過','-4':'今日未營運'};
		var tteHTML = '';		
		if (data.n1!=null) {
			var arrN1 = data.n1.split(',');
			if (TTEMap.hasOwnProperty(arrN1[7]))
				tteHTML= TTEMap[arrN1[7]];
			else{
			var tte=parseInt(arrN1[7],10);
			if (tte>0 && tte<180)
				tteHTML= "將到站";
			else
				tteHTML= Math.floor(tte/60)+"分";
			};
			if (arrN1[3].indexOf("&#x3a;")>-1) if (arrN1[7]=="-1" || parseInt(arrN1[7],10)>5940) 
				tteHTML=arrN1[3]+" 發車"; 			
		}			
		const webhook = await request.json();			
		const dataString = JSON.stringify({
			// Define reply token
			replyToken: webhook.events[0].replyToken,
			// Define reply messages
			messages: [
			{
				type: "text",
				text: "捷運永安市場站：" + tteHTML
			}],
		});												
		const line_url = "https://api.line.me/v2/bot/message/reply";
		const line_init = {
			body: dataString,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer ytKYI7veyXqExx/WE0nx4hY9C8QvUZw9VTlmGhDfgrLtMtKAr9a1gsONiZlyH2vyFDdP+RfBP4Tpg8nHaS8DHP26D0LcLrby2WfQCW1IIOkteK/C0zCmPVSMNIQZ0CTR920LiWyZXWelZHkQR0FxlgdB04t89/1O/w1cDnyilFU="
			},
		};			
		return await fetch(line_url, line_init);    	
	},
};
