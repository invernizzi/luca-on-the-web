/** @license Hyphenator 4.2.0 - client side hyphenation for webbrowsers
 *  Copyright (C) 2013  Mathias Nater, Zürich (mathias at mnn dot ch)
 *  Project and Source hosted on http://code.google.com/p/hyphenator/
 * 
 *  This JavaScript code is free software: you can redistribute
 *  it and/or modify it under the terms of the GNU Lesser
 *  General Public License (GNU LGPL) as published by the Free Software
 *  Foundation, either version 3 of the License, or (at your option)
 *  any later version.  The code is distributed WITHOUT ANY WARRANTY;
 *  without even the implied warranty of MERCHANTABILITY or FITNESS
 *  FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 *  As additional permission under GNU GPL version 3 section 7, you
 *  may distribute non-source (e.g., minimized or compacted) forms of
 *  that code without the copy of the GNU GPL normally required by
 *  section 4, provided you include this license notice and a URL
 *  through which recipients can access the Corresponding Source.
 *
 * 
 *  Hyphenator.js contains code from Bram Steins hypher.js-Project:
 *  https://github.com/bramstein/Hypher
 *  
 *  Code from this project is marked in the source and belongs 
 *  to the following license:
 *  
 *  Copyright (c) 2011, Bram Stein
 *  All rights reserved.
 *  
 *  Redistribution and use in source and binary forms, with or without 
 *  modification, are permitted provided that the following conditions 
 *  are met:
 *   
 *   1. Redistributions of source code must retain the above copyright
 *      notice, this list of conditions and the following disclaimer. 
 *   2. Redistributions in binary form must reproduce the above copyright 
 *      notice, this list of conditions and the following disclaimer in the 
 *      documentation and/or other materials provided with the distribution. 
 *   3. The name of the author may not be used to endorse or promote products 
 *      derived from this software without specific prior written permission. 
 *  
 *  THIS SOFTWARE IS PROVIDED BY THE AUTHOR "AS IS" AND ANY EXPRESS OR IMPLIED 
 *  WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF 
 *  MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO 
 *  EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, 
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, 
 *  BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, 
 *  DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY 
 *  OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING 
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, 
 *  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *  
 */
var Hyphenator=function(e){"use strict";var t,n,a,o,r=e,i=function(){var e={},t=function(t,n,a,o){e[t]={file:n,script:a,prompt:o}};return t("be","be.js",1,"\u041c\u043e\u0432\u0430 \u0433\u044d\u0442\u0430\u0433\u0430 \u0441\u0430\u0439\u0442\u0430 \u043d\u0435 \u043c\u043e\u0436\u0430 \u0431\u044b\u0446\u044c \u0432\u044b\u0437\u043d\u0430\u0447\u0430\u043d\u044b \u0430\u045e\u0442\u0430\u043c\u0430\u0442\u044b\u0447\u043d\u0430. \u041a\u0430\u043b\u0456 \u043b\u0430\u0441\u043a\u0430 \u043f\u0430\u043a\u0430\u0436\u044b\u0446\u0435 \u043c\u043e\u0432\u0443:"),t("ca","ca.js",0,""),t("cs","cs.js",0,"Jazyk t\xe9to internetov\xe9 str\xe1nky nebyl automaticky rozpozn\xe1n. Ur\u010dete pros\xedm jej\xed jazyk:"),t("da","da.js",0,"Denne websides sprog kunne ikke bestemmes. Angiv venligst sprog:"),t("bn","bn.js",4,""),t("de","de.js",0,"Die Sprache dieser Webseite konnte nicht automatisch bestimmt werden. Bitte Sprache angeben:"),t("el","el-monoton.js",6,""),t("el-monoton","el-monoton.js",6,""),t("el-polyton","el-polyton.js",6,""),t("en","en-us.js",0,"The language of this website could not be determined automatically. Please indicate the main language:"),t("en-gb","en-gb.js",0,"The language of this website could not be determined automatically. Please indicate the main language:"),t("en-us","en-us.js",0,"The language of this website could not be determined automatically. Please indicate the main language:"),t("eo","eo.js",0,"La lingvo de \u0109i tiu retpa\u011do ne rekoneblas a\u016dtomate. Bonvolu indiki \u011dian \u0109eflingvon:"),t("es","es.js",0,"El idioma del sitio no pudo determinarse autom%E1ticamente. Por favor, indique el idioma principal:"),t("et","et.js",0,"Veebilehe keele tuvastamine eba\xf5nnestus, palun valige kasutatud keel:"),t("fi","fi.js",0,"Sivun kielt%E4 ei tunnistettu automaattisesti. M%E4%E4rit%E4 sivun p%E4%E4kieli:"),t("fr","fr.js",0,"La langue de ce site n%u2019a pas pu %EAtre d%E9termin%E9e automatiquement. Veuillez indiquer une langue, s.v.p.%A0:"),t("grc","grc.js",6,""),t("gu","gu.js",7,""),t("hi","hi.js",5,""),t("hu","hu.js",0,"A weboldal nyelv\xe9t nem siker\xfclt automatikusan meg\xe1llap\xedtani. K\xe9rem adja meg a nyelvet:"),t("hy","hy.js",3,"\u0549\u0570\u0561\u057b\u0578\u0572\u057e\u0565\u0581 \u0570\u0561\u0575\u057f\u0576\u0561\u0562\u0565\u0580\u0565\u056c \u0561\u0575\u057d \u056f\u0561\u0575\u0584\u056b \u056c\u0565\u0566\u0578\u0582\u0576\u0589 \u053d\u0576\u0564\u0580\u0578\u0582\u0574 \u0565\u0576\u0584 \u0576\u0577\u0565\u0584 \u0570\u056b\u0574\u0576\u0561\u056f\u0561\u0576 \u056c\u0565\u0566\u0578\u0582\u0576\u055d"),t("it","it.js",0,"Lingua del sito sconosciuta. Indicare una lingua, per favore:"),t("kn","kn.js",8,"\u0c9c\u0cbe\u0cb2 \u0ca4\u0cbe\u0ca3\u0ca6 \u0cad\u0cbe\u0cb7\u0cc6\u0caf\u0ca8\u0ccd\u0ca8\u0cc1 \u0ca8\u0cbf\u0cb0\u0ccd\u0ca7\u0cb0\u0cbf\u0cb8\u0cb2\u0cc1 \u0cb8\u0cbe\u0ca7\u0ccd\u0caf\u0cb5\u0cbe\u0c97\u0cc1\u0ca4\u0ccd\u0ca4\u0cbf\u0cb2\u0ccd\u0cb2. \u0ca6\u0caf\u0cb5\u0cbf\u0c9f\u0ccd\u0c9f\u0cc1 \u0cae\u0cc1\u0c96\u0ccd\u0caf \u0cad\u0cbe\u0cb7\u0cc6\u0caf\u0ca8\u0ccd\u0ca8\u0cc1 \u0cb8\u0cc2\u0c9a\u0cbf\u0cb8\u0cbf:"),t("la","la.js",0,""),t("lt","lt.js",0,"Nepavyko automati\u0161kai nustatyti \u0161ios svetain\u0117s kalbos. Pra\u0161ome \u012fvesti kalb\u0105:"),t("lv","lv.js",0,"\u0160\u012bs lapas valodu nevar\u0113ja noteikt autom\u0101tiski. L\u016bdzu nor\u0101diet pamata valodu:"),t("ml","ml.js",10,"\u0d08 \u0d35\u0d46%u0D2C%u0D4D%u200C\u0d38\u0d48\u0d31\u0d4d\u0d31\u0d3f\u0d28\u0d4d\u0d31\u0d46 \u0d2d\u0d3e\u0d37 \u0d15\u0d23\u0d4d\u0d1f\u0d41\u0d2a\u0d3f\u0d1f\u0d3f\u0d2f\u0d4d\u0d15\u0d4d\u0d15\u0d3e%u0D28%u0D4D%u200D \u0d15\u0d34\u0d3f\u0d1e\u0d4d\u0d1e\u0d3f\u0d32\u0d4d\u0d32. \u0d2d\u0d3e\u0d37 \u0d0f\u0d24\u0d3e\u0d23\u0d46\u0d28\u0d4d\u0d28\u0d41 \u0d24\u0d3f\u0d30\u0d1e\u0d4d\u0d1e\u0d46\u0d1f\u0d41\u0d15\u0d4d\u0d15\u0d41\u0d15:"),t("nb","nb-no.js",0,"Nettstedets spr\xe5k kunne ikke finnes automatisk. Vennligst oppgi spr\xe5k:"),t("no","nb-no.js",0,"Nettstedets spr\xe5k kunne ikke finnes automatisk. Vennligst oppgi spr\xe5k:"),t("nb-no","nb-no.js",0,"Nettstedets spr\xe5k kunne ikke finnes automatisk. Vennligst oppgi spr\xe5k:"),t("nl","nl.js",0,"De taal van deze website kan niet automatisch worden bepaald. Geef de hoofdtaal op:"),t("or","or.js",11,""),t("pa","pa.js",13,""),t("pl","pl.js",0,"J\u0119zyka tej strony nie mo\u017cna ustali\u0107 automatycznie. Prosz\u0119 wskaza\u0107 j\u0119zyk:"),t("pt","pt.js",0,"A l\xedngua deste site n\xe3o p\xf4de ser determinada automaticamente. Por favor indique a l\xedngua principal:"),t("ru","ru.js",1,"\u042f\u0437\u044b\u043a \u044d\u0442\u043e\u0433\u043e \u0441\u0430\u0439\u0442\u0430 \u043d\u0435 \u043c\u043e\u0436\u0435\u0442 \u0431\u044b\u0442\u044c \u043e\u043f\u0440\u0435\u0434\u0435\u043b\u0435\u043d \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0447\u0435\u0441\u043a\u0438. \u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430 \u0443\u043a\u0430\u0436\u0438\u0442\u0435 \u044f\u0437\u044b\u043a:"),t("sk","sk.js",0,""),t("sl","sl.js",0,"Jezika te spletne strani ni bilo mogo\u010de samodejno dolo\u010diti. Prosim navedite jezik:"),t("sr-latn","sr-latn.js",0,"Jezika te spletne strani ni bilo mogo\u010de samodejno dolo\u010diti. Prosim navedite jezik:"),t("sv","sv.js",0,"Spr%E5ket p%E5 den h%E4r webbplatsen kunde inte avg%F6ras automatiskt. V%E4nligen ange:"),t("ta","ta.js",14,""),t("te","te.js",15,""),t("tr","tr.js",0,"Bu web sitesinin dili otomatik olarak tespit edilememi\u015ftir. L\xfctfen d\xf6k\xfcman\u0131n dilini se\xe7iniz%A0:"),t("uk","uk.js",1,"\u041c\u043e\u0432\u0430 \u0446\u044c\u043e\u0433\u043e \u0432\u0435\u0431-\u0441\u0430\u0439\u0442\u0443 \u043d\u0435 \u043c\u043e\u0436\u0435 \u0431\u0443\u0442\u0438 \u0432\u0438\u0437\u043d\u0430\u0447\u0435\u043d\u0430 \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0447\u043d\u043e. \u0411\u0443\u0434\u044c \u043b\u0430\u0441\u043a\u0430, \u0432\u043a\u0430\u0436\u0456\u0442\u044c \u0433\u043e\u043b\u043e\u0432\u043d\u0443 \u043c\u043e\u0432\u0443:"),t("ro","ro.js",0,"Limba acestui sit nu a putut fi determinat\u0103 automat. Alege limba principal\u0103:"),e}(),s=function(){for(var e,t,n=r.document.getElementsByTagName("script"),a=0,o=n[a],i="";o;)o.src&&(t=o.src,e=t.indexOf("Hyphenator.js"),-1!==e&&(i=t.substring(0,e))),a+=1,o=n[a];return i?i:"http://hyphenator.googlecode.com/svn/trunk/"}(),l=function(){var t=!1;return-1!==e.location.href.indexOf(s)&&(t=!0),t}(),c=!1,u=!1,p=!1,h={script:!0,code:!0,pre:!0,img:!0,br:!0,samp:!0,kbd:!0,"var":!0,abbr:!0,acronym:!0,sub:!0,sup:!0,button:!0,option:!0,label:!0,textarea:!0,input:!0,math:!0,svg:!0},d=!0,g="local",f=!1,y=!0,m=!1,b=function(t){e.alert("Hyphenator.js says:\n\nAn Error occurred:\n"+t.message)},v=function(t,n){n=n||r;var a;return e.document.createElementNS?a=n.document.createElementNS("http://www.w3.org/1999/xhtml",t):e.document.createElement&&(a=n.document.createElement(t)),a},w=!1,k=function(){var t,a=function(t){var n=["aabbccddeeffgghhiijjkkllmmnnooppqqrrssttuuvvwwxxyyzz","\u0430\u0431\u0432\u0433\u0434\u0435\u0451\u0436\u0437\u0438\u0439\u043a\u043b\u043c\u043d\u043e\u043f\u0440\u0441\u0442\u0443\u0444\u0445\u0446\u0447\u0448\u0449\u044a\u044b\u044c\u044d\u044e\u044f","\u0623\u0628\u062a\u062b\u062c\u062d\u062e\u062f\u0630\u0631\u0632\u0633\u0634\u0635\u0636\u0637\u0638\u0639\u063a\u0641\u0642\u0643\u0644\u0645\u0646\u0647\u0648\u064a","\u0561\u0562\u0563\u0564\u0565\u0566\u0567\u0568\u0569\u056a\u056b\u056c\u056d\u056e\u056f\u0570\u0571\u0572\u0573\u0574\u0575\u0576\u0577\u0578\u0579\u057a\u057b\u057c\u057d\u057e\u057f\u0580\u0581\u0582\u0583\u0584\u0585\u0586","\u0981\u0982\u0983\u0985\u0986\u0987\u0988\u0989\u098a\u098b\u098c\u098f\u0990\u0993\u0994\u0995\u0996\u0997\u0998\u0999\u099a\u099b\u099c\u099d\u099e\u099f\u09a0\u09a1\u09a2\u09a3\u09a4\u09a5\u09a6\u09a7\u09a8\u09aa\u09ab\u09ac\u09ad\u09ae\u09af\u09b0\u09b2\u09b6\u09b7\u09b8\u09b9\u09bc\u09bd\u09be\u09bf\u09c0\u09c1\u09c2\u09c3\u09c4\u09c7\u09c8\u09cb\u09cc\u09cd\u09ce\u09d7\u09dc\u09dd\u09df\u09e0\u09e1\u09e2\u09e3","\u0901\u0902\u0903\u0905\u0906\u0907\u0908\u0909\u090a\u090b\u090c\u090f\u0910\u0913\u0914\u0915\u0916\u0917\u0918\u0919\u091a\u091b\u091c\u091d\u091e\u091f\u0920\u0921\u0922\u0923\u0924\u0925\u0926\u0927\u0928\u092a\u092b\u092c\u092d\u092e\u092f\u0930\u0932\u0933\u0935\u0936\u0937\u0938\u0939\u093d\u093e\u093f\u0940\u0941\u0942\u0943\u0944\u0947\u0948\u094b\u094c\u094d\u0952\u0951\u0960\u0961\u0962\u0963","\u03b1\u03b2\u03b3\u03b4\u03b5\u03b6\u03b7\u03b8\u03b9\u03ba\u03bb\u03bc\u03bd\u03be\u03bf\u03c0\u03c1\u03c3\u03c2\u03c4\u03c5\u03c6\u03c7\u03c8\u03c9","\u0aac\u0ab9\u0a85\u0a86\u0a87\u0a88\u0a89\u0a8a\u0a8b\u0ae0\u0a8f\u0a90\u0a93\u0a94\u0abe\u0abf\u0ac0\u0ac1\u0ac2\u0ac3\u0ac4\u0ae2\u0ae3\u0ac7\u0ac8\u0acb\u0acc\u0a95\u0a96\u0a97\u0a98\u0a99\u0a9a\u0a9b\u0a9c\u0a9d\u0a9e\u0a9f\u0aa0\u0aa1\u0aa2\u0aa3\u0aa4\u0aa5\u0aa6\u0aa7\u0aa8\u0aaa\u0aab\u0ab8\u0aad\u0aae\u0aaf\u0ab0\u0ab2\u0ab3\u0ab5\u0ab6\u0ab7","\u0c82\u0c83\u0c85\u0c86\u0c87\u0c88\u0c89\u0c8a\u0c8b\u0c8c\u0c8e\u0c8f\u0c90\u0c92\u0c93\u0c94\u0c95\u0c96\u0c97\u0c98\u0c99\u0c9a\u0c9b\u0c9c\u0c9d\u0c9e\u0c9f\u0ca0\u0ca1\u0ca2\u0ca3\u0ca4\u0ca5\u0ca6\u0ca7\u0ca8\u0caa\u0cab\u0cac\u0cad\u0cae\u0caf\u0cb0\u0cb1\u0cb2\u0cb3\u0cb5\u0cb6\u0cb7\u0cb8\u0cb9\u0cbd\u0cbe\u0cbf\u0cc0\u0cc1\u0cc2\u0cc3\u0cc4\u0cc6\u0cc7\u0cc8\u0cca\u0ccb\u0ccc\u0ccd\u0cd5\u0cd6\u0cde\u0ce0\u0ce1","\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94\u0e95\u0e96\u0e97\u0e99\u0e9a\u0e9b\u0e9c\u0e9d\u0e9e\u0e9f\u0ea1\u0ea2\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead\u0eae\u0eb0\u0eb1\u0eb2\u0eb4\u0eb5\u0eb6\u0eb7\u0eb8\u0eb9\u0ebb\u0ebc\u0ec0\u0ec1\u0ec2\u0ec3\u0ec4\u0ec8\u0ec9\u0eca\u0ecb\u0edc\u0edd","\u0d02\u0d03\u0d05\u0d06\u0d07\u0d08\u0d09\u0d0a\u0d0b\u0d0c\u0d0e\u0d0f\u0d10\u0d12\u0d13\u0d14\u0d15\u0d16\u0d17\u0d18\u0d19\u0d1a\u0d1b\u0d1c\u0d1d\u0d1e\u0d1f\u0d20\u0d21\u0d22\u0d23\u0d24\u0d25\u0d26\u0d27\u0d28\u0d2a\u0d2b\u0d2c\u0d2d\u0d2e\u0d2f\u0d30\u0d31\u0d32\u0d33\u0d34\u0d35\u0d36\u0d37\u0d38\u0d39\u0d3e\u0d3f\u0d40\u0d41\u0d42\u0d43\u0d46\u0d47\u0d48\u0d4a\u0d4b\u0d4c\u0d4d\u0d57\u0d60\u0d61\u0d7a\u0d7b\u0d7c\u0d7d\u0d7e\u0d7f","\u0b01\u0b02\u0b03\u0b05\u0b06\u0b07\u0b08\u0b09\u0b0a\u0b0b\u0b0c\u0b0f\u0b10\u0b13\u0b14\u0b15\u0b16\u0b17\u0b18\u0b19\u0b1a\u0b1b\u0b1c\u0b1d\u0b1e\u0b1f\u0b20\u0b21\u0b22\u0b23\u0b24\u0b25\u0b26\u0b27\u0b28\u0b2a\u0b2b\u0b2c\u0b2d\u0b2e\u0b2f\u0b30\u0b32\u0b33\u0b35\u0b36\u0b37\u0b38\u0b39\u0b3e\u0b3f\u0b40\u0b41\u0b42\u0b43\u0b47\u0b48\u0b4b\u0b4c\u0b4d\u0b57\u0b60\u0b61","\u0623\u0628\u062a\u062b\u062c\u062d\u062e\u062f\u0630\u0631\u0632\u0633\u0634\u0635\u0636\u0637\u0638\u0639\u063a\u0641\u0642\u0643\u0644\u0645\u0646\u0647\u0648\u064a","\u0a01\u0a02\u0a03\u0a05\u0a06\u0a07\u0a08\u0a09\u0a0a\u0a0f\u0a10\u0a13\u0a14\u0a15\u0a16\u0a17\u0a18\u0a19\u0a1a\u0a1b\u0a1c\u0a1d\u0a1e\u0a1f\u0a20\u0a21\u0a22\u0a23\u0a24\u0a25\u0a26\u0a27\u0a28\u0a2a\u0a2b\u0a2c\u0a2d\u0a2e\u0a2f\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a3e\u0a3f\u0a40\u0a41\u0a42\u0a47\u0a48\u0a4b\u0a4c\u0a4d\u0a70\u0a71","\u0b83\u0b85\u0b86\u0b87\u0b88\u0b89\u0b8a\u0b8e\u0b8f\u0b90\u0b92\u0b93\u0b94\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8\u0ba9\u0baa\u0bae\u0baf\u0bb0\u0bb1\u0bb2\u0bb3\u0bb4\u0bb5\u0bb7\u0bb8\u0bb9\u0bbe\u0bbf\u0bc0\u0bc1\u0bc2\u0bc6\u0bc7\u0bc8\u0bca\u0bcb\u0bcc\u0bcd\u0bd7","\u0c01\u0c02\u0c03\u0c05\u0c06\u0c07\u0c08\u0c09\u0c0a\u0c0b\u0c0c\u0c0e\u0c0f\u0c10\u0c12\u0c13\u0c14\u0c15\u0c16\u0c17\u0c18\u0c19\u0c1a\u0c1b\u0c1c\u0c1d\u0c1e\u0c1f\u0c20\u0c21\u0c22\u0c23\u0c24\u0c25\u0c26\u0c27\u0c28\u0c2a\u0c2b\u0c2c\u0c2d\u0c2e\u0c2f\u0c30\u0c31\u0c32\u0c33\u0c35\u0c36\u0c37\u0c38\u0c39\u0c3e\u0c3f\u0c40\u0c41\u0c42\u0c43\u0c44\u0c46\u0c47\u0c48\u0c4a\u0c4b\u0c4c\u0c4d\u0c55\u0c56\u0c60\u0c61"],a=function(a){var o,r,s=e.document.getElementsByTagName("body")[0],l=!1;return i.hasOwnProperty(a)?(o=v("div",e),o.id="Hyphenator_LanguageChecker",o.style.width="5em",o.style[t]="auto",o.style.hyphens="auto",o.style.fontSize="12px",o.style.lineHeight="12px",o.style.visibility="hidden",o.lang=a,o.style["-webkit-locale"]="'"+a+"'",o.innerHTML=n[i[a].script],s.appendChild(o),r=o.offsetHeight,s.removeChild(o),l=r>12?!0:!1):l=!1,l};return a},o={support:!1,property:"",checkLangSupport:function(){}};return e.getComputedStyle?(t=r.getComputedStyle(r.document.getElementsByTagName("body")[0],null),void 0!==t["-webkit-hyphens"]?(o.support=!0,o.property="-webkit-hyphens",o.checkLangSupport=a("-webkit-hyphens")):void 0!==t.MozHyphens?(o.support=!0,o.property="-moz-hyphens",o.checkLangSupport=a("MozHyphens")):void 0!==t["-ms-hyphens"]&&(o.support=!0,o.property="-ms-hyphens",o.checkLangSupport=a("-ms-hyphens")),void(n=o)):void(n=o)},x="hyphenate",E="Hyphenator"+Math.round(1e3*Math.random()),S=E+"hide",C=new RegExp("\\s?\\b"+S+"\\b","g"),H=E+"unhide",j=new RegExp("\\s?\\b"+H+"\\b","g"),N=E+"css3hyphenate",O="donthyphenate",R=6,L=1,P=function(){for(var e=null,t=!1,n=r.document.getElementsByTagName("script"),a=0,o=n.length;!t&&o>a;)e=n[a].getAttribute("src"),e&&-1!==e.indexOf("Hyphenator.js?bm=true")&&(t=!0),a+=1;return t}(),T=null,A="",B=function(){var e=function(e){this.element=e,this.hyphenated=!1,this.treated=!1},t=function(){this.count=0,this.hyCount=0,this.list={}};return t.prototype={add:function(t,n){this.list.hasOwnProperty(n)||(this.list[n]=[]),this.list[n].push(new e(t)),this.count+=1},each:function(e){var t;for(t in this.list)this.list.hasOwnProperty(t)&&(2===e.length?e(t,this.list[t]):e(this.list[t]))}},new t}(),z={},D={},M=0,F="(\\w*://)?((\\w*:)?(\\w*)@)?((([\\d]{1,3}\\.){3}([\\d]{1,3}))|((www\\.|[a-zA-Z]\\.)?[a-zA-Z0-9\\-\\.]+\\.([a-z]{2,4})))(:\\d*)?(/[\\w#!:\\.?\\+=&%@!\\-]*)*",I="[\\w-\\.]+@[\\w\\.]+",q=new RegExp("("+F+")|("+I+")","i"),J=function(){var t,n=e.navigator.userAgent.toLowerCase();return t=String.fromCharCode(8203),-1!==n.indexOf("msie 6")&&(t=""),-1!==n.indexOf("opera")&&-1!==n.indexOf("version/10.00")&&(t=""),t}(),V=function(e){return e},X=function(e){return e},_=function(){},W=!1,U=function(t){var n,a,o,i=[];if(e.document.getElementsByClassName)i=r.document.getElementsByClassName(t);else if(e.document.querySelectorAll)i=r.document.querySelectorAll("."+t);else for(n=r.document.getElementsByTagName("*"),o=n.length,a=0;o>a;a+=1)-1!==n[a].className.indexOf(t)&&-1===n[a].className.indexOf(O)&&i.push(n[a]);return i},Z=function(){var e;return e=W?W():U(x)},$="hidden",G="wait",K=[],Y=function(t){t=t||e;var n=t.document,a=function(){var e,t,a,o=n.styleSheets.length,r=!1;for(e=0;o>e;e+=1){t=n.styleSheets[e];try{if(t.cssRules){r=t;break}}catch(i){}}return r===!1&&(a=n.createElement("style"),a.type="text/css",n.getElementsByTagName("head")[0].appendChild(a),r=n.styleSheets[n.styleSheets.length-1]),r}(),o=[],r=function(t){var n,a,o,r,i,s=e.document.styleSheets,l=!1;for(r=0;r<s.length;r+=1){n=s[r];try{n.cssRules?o=n.cssRules:n.rules&&(o=n.rules)}catch(c){}if(o&&o.length)for(i=0;i<o.length;i+=1)a=o[i],a.selectorText===t&&(l={index:i,rule:a})}return l},i=function(e,t){var n,o;return a.insertRule?(n=a.cssRules?a.cssRules.length:0,o=a.insertRule(e+"{"+t+"}",n)):a.addRule&&(n=a.rules?a.rules.length:0,a.addRule(e,t,n),o=n),o},s=function(e,t){e.deleteRule?e.deleteRule(t):e.removeRule(t)};return{setRule:function(e,t){var n,s,l;s=r(e),s?(l=s.rule.cssText?s.rule.cssText:s.rule.style.cssText.toLowerCase(),l==="."+x+" { visibility: hidden; }"?o.push({sheet:s.rule.parentStyleSheet,index:s.index}):-1!==l.indexOf("visibility: hidden")?(n=i(e,t),o.push({sheet:a,index:n}),s.rule.style.visibility=""):i(e,t)):(n=i(e,t),o.push({sheet:a,index:n}))},clearChanges:function(){for(var e=o.pop();e;)s(e.sheet,e.index),e=o.pop()}}},Q=String.fromCharCode(173),et=J,tt=!0,/*
         * runOnContentLoaded is based od jQuery.bindReady()
         * see
         * jQuery JavaScript Library v1.3.2
         * http://jquery.com/
         *
         * Copyright (c) 2009 John Resig
         * Dual licensed under the MIT and GPL licenses.
         * http://docs.jquery.com/License
         *
         * Date: 2009-02-19 17:34:21 -0500 (Thu, 19 Feb 2009)
         * Revision: 6246
         */
nt=function(t,n){var a,o={},i=e.document.addEventListener?"addEventListener":"attachEvent",s=e.document.addEventListener?"removeEventListener":"detachEvent",l=e.document.addEventListener?"":"on",u=function(t){r=t||e,o[r.location.href]||c&&!r.frameElement||(c=!0,n(),o[r.location.href]=!0)},h=function(){try{r.document.documentElement.doScroll("left")}catch(t){return void e.setTimeout(h,1)}u(e)},d=function(){var t,a,i=e.frames.length;if(p&&i>0){for(t=0;i>t;t+=1){a=void 0;try{a=e.frames[t].document.toString()}catch(s){a=void 0}a&&"about:blank"!==e.frames[t].location.href&&u(e.frames[t])}r=e,n(),o[e.location.href]=!0}else u(e)},g=function(t){("readystatechange"!==t.type||"complete"===r.document.readyState)&&(r.document[s](l+t.type,g,!1),p||0!==e.frames.length||u(e))};if(c&&!o[t.location.href])return n(),void(o[t.location.href]=!0);if("complete"===r.document.readyState||"interactive"===r.document.readyState)e.setTimeout(d,1);else{r.document[i](l+"DOMContentLoaded",g,!1),r.document[i](l+"readystatechange",g,!1),e[i](l+"load",d,!1),a=!1;try{a=!e.frameElement}catch(f){}r.document.documentElement.doScroll&&a&&h()}},at=function(e,t){try{return e.getAttribute("lang")?e.getAttribute("lang").toLowerCase():e.getAttribute("xml:lang")?e.getAttribute("xml:lang").toLowerCase():"html"!==e.tagName.toLowerCase()?at(e.parentNode,t):t?T:null}catch(n){}},ot=function(t){t=t||r;var n,a=t.document.getElementsByTagName("html")[0],o=t.document.getElementsByTagName("meta"),l=function(){var n,a,o="",r=300,l=450,c=Math.floor((t.outerWidth-l)/2)+e.screenX,u=Math.floor((t.outerHeight-r)/2)+e.screenY,p="";return e.showModalDialog?n=e.showModalDialog(s+"modalLangDialog.html",i,"dialogWidth: "+l+"px; dialogHeight: "+r+"px; dialogtop: "+u+"; dialogleft: "+c+"; center: on; resizable: off; scroll: off;"):(a=function(){var e,t="";for(e in i)i.hasOwnProperty(e)&&(t+=e+", ");return t=t.substring(0,t.length-2)}(),p=e.navigator.language||e.navigator.userLanguage,p=p.substring(0,2),o=i[p]&&""!==i[p].prompt?i[p].prompt:i.en.prompt,o+=" (ISO 639-1)\n\n"+a,n=e.prompt(e.unescape(o),p).toLowerCase()),n};if(T=at(a,!1),!T)for(n=0;n<o.length;n+=1)o[n].getAttribute("http-equiv")&&"content-language"===o[n].getAttribute("http-equiv").toLowerCase()&&(T=o[n].getAttribute("content").toLowerCase()),o[n].getAttribute("name")&&"dc.language"===o[n].getAttribute("name").toLowerCase()&&(T=o[n].getAttribute("content").toLowerCase()),o[n].getAttribute("name")&&"language"===o[n].getAttribute("name").toLowerCase()&&(T=o[n].getAttribute("content").toLowerCase());!T&&p&&r.frameElement&&ot(e.parent),T||""===A||(T=A),T||(T=l()),a.lang=T},rt=function(){var e,t,o=0,s=function(t,o){var l,c=0,u=!0;for(o=t.lang&&"string"==typeof t.lang?t.lang.toLowerCase():o?o.toLowerCase():at(t,!0),w&&n.support&&n.checkLangSupport(o)?(a=new Y(r),a.setRule("."+N,n.property+": auto;"),a.setRule("."+O,n.property+": none;"),a.setRule("."+N,"-webkit-locale : "+o+";"),t.className=t.className+" "+N):(i.hasOwnProperty(o)?D[o]=!0:i.hasOwnProperty(o.split("-")[0])?(o=o.split("-")[0],D[o]=!0):P||(u=!1,b(new Error('Language "'+o+'" is not yet supported.'))),u&&("hidden"===$&&(t.className=t.className+" "+S),B.add(t,o))),l=t.childNodes[c];l;)1!==l.nodeType||h[l.nodeName.toLowerCase()]||-1!==l.className.indexOf(O)||e[l]||s(l,o),c+=1,l=t.childNodes[c]};if(w&&k(),P)e=r.document.getElementsByTagName("body")[0],s(e,T);else for(w||"hidden"!==$||(K.push(new Y(r)),K[K.length-1].setRule("."+x,"visibility: hidden;"),K[K.length-1].setRule("."+S,"visibility: hidden;"),K[K.length-1].setRule("."+H,"visibility: visible;")),e=Z(),t=e[o];t;)s(t,""),o+=1,t=e[o];if(0===B.count){for(o=0;o<K.length;o+=1)K[o].clearChanges();M=3,_()}},it=function(e){/** @license BSD licenced code
             * The following code is based on code from hypher.js and adapted for Hyphenator.js
             * Copyright (c) 2011, Bram Stein
             */
var t,n,a,o,r,i,s,l,c,u,p,h,d=0,g={tpoints:[]},f=Hyphenator.languages[e].patterns,y="in3se",m=function(){return h=1===y.split(/\D/).length?function(e){return e=e.replace(/\D/gi," "),e.split(" ")}:function(e){return e.split(/\D/)}}();for(d in f)if(f.hasOwnProperty(d))for(t=f[d].match(new RegExp(".{1,"+ +d+"}","g")),a=0,n=t[a];n;){for(s=n.replace(/[\d]/g,"").split(""),l=m(n),c=g,o=0,i=s[o];i;)p=i.charCodeAt(0),c[p]||(c[p]={}),c=c[p],o+=1,i=s[o];for(c.tpoints=[],r=0;r<l.length;r+=1)u=l[r],c.tpoints.push(""===u?0:u);a+=1,n=t[a]}Hyphenator.languages[e].patterns=g},st=function(e,t){var n,a=[],o=e.split("");for(n=0;n<t.length;n+=1)0!==t[n]&&a.push(t[n]),o[n]&&a.push(o[n]);return a.join("")},lt=function(e){var t,n,a,o=e.split(", "),r={};for(t=0,n=o.length;n>t;t+=1)a=o[t].replace(/-/g,""),r.hasOwnProperty(a)||(r[a]=o[t]);return r},ct=function(t){var n,a,o,r;if(i.hasOwnProperty(t)&&!Hyphenator.languages[t]){if(n=s+"patterns/"+i[t].file,l&&!P){a=null;try{a=new e.XMLHttpRequest}catch(c){try{a=new e.ActiveXObject("Microsoft.XMLHTTP")}catch(u){try{a=new e.ActiveXObject("Msxml2.XMLHTTP")}catch(p){a=null}}}a&&(a.open("HEAD",n,!0),a.setRequestHeader("Cache-Control","no-cache"),a.onreadystatechange=function(){return 4===a.readyState&&404===a.status?(b(new Error("Could not load\n"+n)),void delete D[t]):void 0},a.send(null))}v&&(o=e.document.getElementsByTagName("head").item(0),r=v("script",e),r.src=n,r.type="text/javascript",o.appendChild(r))}},ut=function(n){var a,o=Hyphenator.languages[n];if(o.prepared||(d&&(o.cache={}),f&&(o.redPatSet={}),o.hasOwnProperty("exceptions")&&(Hyphenator.addExceptions(n,o.exceptions),delete o.exceptions),z.hasOwnProperty("global")&&(z.hasOwnProperty(n)?z[n]+=", "+z.global:z[n]=z.global),z.hasOwnProperty(n)?(o.exceptions=lt(z[n]),delete z[n]):o.exceptions={},it(n),a="[\\w"+o.specialChars+"@"+String.fromCharCode(173)+String.fromCharCode(8204)+"-]{"+R+",}",o.genRegExp=new RegExp("("+F+")|("+I+")|("+a+")","gi"),o.prepared=!0),t)try{t.setItem(n,e.JSON.stringify(o))}catch(r){b(r)}},pt=function(n){var a,o,r,i;if(!y){for(a in Hyphenator.languages)Hyphenator.languages.hasOwnProperty(a)&&ut(a);return M=2,void n("*")}M=1;for(a in D)if(D.hasOwnProperty(a))if(t&&t.test(a)){if(Hyphenator.languages[a]=e.JSON.parse(t.getItem(a)),z.hasOwnProperty("global")){r=lt(z.global);for(i in r)r.hasOwnProperty(i)&&(Hyphenator.languages[a].exceptions[i]=r[i])}if(z.hasOwnProperty(a)){r=lt(z[a]);for(i in r)r.hasOwnProperty(i)&&(Hyphenator.languages[a].exceptions[i]=r[i]);delete z[a]}r="[\\w"+Hyphenator.languages[a].specialChars+"@"+String.fromCharCode(173)+String.fromCharCode(8204)+"-]{"+R+",}",Hyphenator.languages[a].genRegExp=new RegExp("("+F+")|("+I+")|("+r+")","gi"),delete D[a],n(a)}else ct(a);o=e.setInterval(function(){var t,a=!0;for(t in D)D.hasOwnProperty(t)&&(a=!1,Hyphenator.languages[t]&&(delete D[t],ut(t),n(t)));a&&(e.clearInterval(o),M=2)},100)},ht=function(){var e,t,n=Hyphenator.doHyphenation?"Hy-phen-a-tion":"Hyphenation",a=r.document.getElementById("HyphenatorToggleBox");a?a.firstChild.data=n:(e=r.document.getElementsByTagName("body")[0],a=v("div",r),a.setAttribute("id","HyphenatorToggleBox"),a.setAttribute("class",O),t=r.document.createTextNode(n),a.appendChild(t),a.onclick=Hyphenator.toggleHyphenation,a.style.position="absolute",a.style.top="0px",a.style.right="0px",a.style.margin="0",a.style.backgroundColor="#AAAAAA",a.style.color="#FFFFFF",a.style.font="6pt Arial",a.style.letterSpacing="0.2em",a.style.padding="3px",a.style.cursor="pointer",a.style.WebkitBorderBottomLeftRadius="4px",a.style.MozBorderRadiusBottomleft="4px",a.style.borderBottomLeftRadius="4px",e.appendChild(a))},dt=function(e,t){var n,a,o,r,i,s,l,c,u,p,h,g,y,m,b,v,w,k=Hyphenator.languages[e],x=[],E=[],S=Math.max,C=[""];if(t=V(t,e),""===t)w="";else if(d&&k.cache.hasOwnProperty(t))w=k.cache[t];else if(-1!==t.indexOf(Q))w=t;else if(k.exceptions.hasOwnProperty(t))w=k.exceptions[t].replace(/-/g,Q);else if(-1!==t.indexOf("-")){for(n=t.split("-"),u=0,a=n.length;a>u;u+=1)n[u]=dt(e,n[u]);w=n.join("-")}else{if(s=t,r=t="_"+t+"_",k.charSubstitution)for(o in k.charSubstitution)k.charSubstitution.hasOwnProperty(o)&&(r=r.replace(new RegExp(o,"g"),k.charSubstitution[o]));for(-1!==s.indexOf("'")&&(r=r.replace("'","\u2019")),/** @license BSD licenced code
                 * The following code is based on code from hypher.js
                 * Copyright (c) 2011, Bram Stein
                 */
i=r.toLowerCase().split(""),l=t.split(""),c=i.length,b=k.patterns,u=0;c>u;u+=1)x[u]=0,E[u]=i[u].charCodeAt(0);for(u=0;c>u;u+=1)for(v="",g=b,p=u;c>p&&(g=g[E[p]],g);p+=1)if(f&&(v+=String.fromCharCode(E[p])),y=g.tpoints)for(f&&(k.redPatSet||(k.redPatSet={}),k.redPatSet[v]=st(v,y)),h=0,m=y.length;m>h;h+=1)x[u+h]=S(x[u+h],y[h]);for(u=1;c-1>u;u+=1)u>k.leftmin&&u<c-k.rightmin&&x[u]%2?C.push(l[u]):C[C.length-1]+=l[u];w=C.join(Q)}return w=X(w,e),d&&(k.cache[s]=w),w},gt=function(e){return e.replace(/([:\/\.\?#&_,;!@]+)/gi,"$&"+et)},ft=function(e){var t,n,a=0;switch(Q){case"|":t="\\|";break;case"+":t="\\+";break;case"*":t="\\*";break;default:t=Q}for(n=e.childNodes[a];n;)3===n.nodeType?(n.data=n.data.replace(new RegExp(t,"g"),""),n.data=n.data.replace(new RegExp(J,"g"),"")):1===n.nodeType&&ft(n),a+=1,n=e.childNodes[a]},yt=function(t){var n=t.ownerDocument.getElementsByTagName("body")[0];n&&(t=t||n,e.removeEventListener?t.removeEventListener("copy",o,!0):t.detachEvent("oncopy",o))},mt=function(t){var n,a,r,i,s,l=t.ownerDocument.getElementsByTagName("body")[0];o=function(t){t=t||e.event;var o=t.target||t.srcElement,l=o.ownerDocument,c=l.getElementsByTagName("body")[0],u=l.defaultView||l.parentWindow;o.tagName&&h[o.tagName.toLowerCase()]||(n=l.createElement("div"),n.style.color=e.getComputedStyle?u.getComputedStyle(c,null).backgroundColor:"#FFFFFF",n.style.fontSize="0px",c.appendChild(n),e.getSelection?(t.stopPropagation(),a=u.getSelection(),r=a.getRangeAt(0),n.appendChild(r.cloneContents()),ft(n),a.selectAllChildren(n),s=function(){n.parentNode.removeChild(n),a.removeAllRanges(),a.addRange(r)}):(t.cancelBubble=!0,a=u.document.selection,r=a.createRange(),n.innerHTML=r.htmlText,ft(n),i=c.createTextRange(),i.moveToElementText(n),i.select(),s=function(){n.parentNode.removeChild(n),""!==r.text&&r.select()}),e.setTimeout(s,0))},l&&(t=t||l,e.addEventListener?t.addEventListener("copy",o,!0):t.attachEvent("oncopy",o))},bt=function(){var e,t=!0;if(B.each(function(e){var n,a=e.length;for(n=0;a>n;n+=1)t=t&&e[n].hyphenated}),t){for("hidden"===$&&"progressive"===G&&B.each(function(e){var t,n,a=e.length;for(t=0;a>t;t+=1)n=e[t].element,n.className=n.className.replace(j,""),""===n.className&&n.removeAttribute("class")}),e=0;e<K.length;e+=1)K[e].clearChanges();M=3,_()}},vt=function(e,t){var n,a,o,r,i=t.element,s=function(e){var t,n;switch(Q){case"|":t="\\|";break;case"+":t="\\+";break;case"*":t="\\*";break;default:t=Q}return L>=2&&(n=e.split(" "),n[1]=n[1].replace(new RegExp(t,"g"),""),n[1]=n[1].replace(new RegExp(J,"g"),""),n=n.join(" ")),3===L&&(n=n.replace(/[ ]+/g,String.fromCharCode(160))),n};if(Hyphenator.languages.hasOwnProperty(e))for(n=function(t){return r=Hyphenator.doHyphenation?q.test(t)?gt(t):dt(e,t):t},tt&&"body"!==i.tagName.toLowerCase()&&mt(i),o=0,a=i.childNodes[o];a;)3===a.nodeType&&a.data.length>=R&&(a.data=a.data.replace(Hyphenator.languages[e].genRegExp,n),1!==L&&(a.data=a.data.replace(/[\S]+ [\S]+$/,s))),o+=1,a=i.childNodes[o];"hidden"===$&&"wait"===G&&(i.className=i.className.replace(C,""),""===i.className&&i.removeAttribute("class")),"hidden"===$&&"progressive"===G&&(i.className=i.className.replace(C," "+H)),t.hyphenated=!0,B.hyCount+=1,B.count<=B.hyCount&&bt()},wt=function(t){function n(e,t,n){return function(){return e(t,n)}}var a,o;if("*"===t)B.each(function(t,a){var o,r=a.length;for(o=0;r>o;o+=1)e.setTimeout(n(vt,t,a[o]),0)});else if(B.list.hasOwnProperty(t))for(o=B.list[t].length,a=0;o>a;a+=1)e.setTimeout(n(vt,t,B.list[t][a]),0)},kt=function(){B.each(function(e){var t,n=e.length;for(t=0;n>t;t+=1)ft(e[t].element),tt&&yt(e[t].element),e[t].hyphenated=!1}),M=4},xt=function(){var n;try{if("none"!==g&&void 0!==e.localStorage&&void 0!==e.sessionStorage&&void 0!==e.JSON.stringify&&void 0!==e.JSON.parse)switch(g){case"session":n=e.sessionStorage;break;case"local":n=e.localStorage;break;default:n=void 0}}catch(a){}t=n?{prefix:"Hyphenator_"+Hyphenator.version+"_",store:n,test:function(e){var t=this.store.getItem(this.prefix+e);return t?!0:!1},getItem:function(e){return this.store.getItem(this.prefix+e)},setItem:function(e,t){this.store.setItem(this.prefix+e,t)}}:void 0},Et=function(){if(t){var n={STORED:!0,classname:x,donthyphenateclassname:O,minwordlength:R,hyphenchar:Q,urlhyphenchar:et,togglebox:ht,displaytogglebox:m,remoteloading:y,enablecache:d,onhyphenationdonecallback:_,onerrorhandler:b,intermediatestate:$,selectorfunction:W||U,safecopy:tt,doframes:p,storagetype:g,orphancontrol:L,dohyphenation:Hyphenator.doHyphenation,persistentconfig:u,defaultlanguage:A,useCSS3hyphenation:w,unhide:G,onbeforewordhyphenation:V,onafterwordhyphenation:X};t.setItem("config",e.JSON.stringify(n))}},St=function(){var n;t.test("config")&&(n=e.JSON.parse(t.getItem("config")),Hyphenator.config(n))};return{version:"4.2.0",doHyphenation:!0,languages:{},config:function(e){var n,a=function(t,n){var a,o;return o=typeof e[t],o===n?a=!0:(b(new Error("Config onError: "+t+" must be of type "+n)),a=!1),a};e.hasOwnProperty("storagetype")&&(a("storagetype","string")&&(g=e.storagetype),t||xt()),!e.hasOwnProperty("STORED")&&t&&e.hasOwnProperty("persistentconfig")&&e.persistentconfig===!0&&St();for(n in e)if(e.hasOwnProperty(n))switch(n){case"STORED":break;case"classname":a("classname","string")&&(x=e[n]);break;case"donthyphenateclassname":a("donthyphenateclassname","string")&&(O=e[n]);break;case"minwordlength":a("minwordlength","number")&&(R=e[n]);break;case"hyphenchar":a("hyphenchar","string")&&("&shy;"===e.hyphenchar&&(e.hyphenchar=String.fromCharCode(173)),Q=e[n]);break;case"urlhyphenchar":e.hasOwnProperty("urlhyphenchar")&&a("urlhyphenchar","string")&&(et=e[n]);break;case"togglebox":a("togglebox","function")&&(ht=e[n]);break;case"displaytogglebox":a("displaytogglebox","boolean")&&(m=e[n]);break;case"remoteloading":a("remoteloading","boolean")&&(y=e[n]);break;case"enablecache":a("enablecache","boolean")&&(d=e[n]);break;case"enablereducedpatternset":a("enablereducedpatternset","boolean")&&(f=e[n]);break;case"onhyphenationdonecallback":a("onhyphenationdonecallback","function")&&(_=e[n]);break;case"onerrorhandler":a("onerrorhandler","function")&&(b=e[n]);break;case"intermediatestate":a("intermediatestate","string")&&($=e[n]);break;case"selectorfunction":a("selectorfunction","function")&&(W=e[n]);break;case"safecopy":a("safecopy","boolean")&&(tt=e[n]);break;case"doframes":a("doframes","boolean")&&(p=e[n]);break;case"storagetype":a("storagetype","string")&&(g=e[n]);break;case"orphancontrol":a("orphancontrol","number")&&(L=e[n]);break;case"dohyphenation":a("dohyphenation","boolean")&&(Hyphenator.doHyphenation=e[n]);break;case"persistentconfig":a("persistentconfig","boolean")&&(u=e[n]);break;case"defaultlanguage":a("defaultlanguage","string")&&(A=e[n]);break;case"useCSS3hyphenation":a("useCSS3hyphenation","boolean")&&(w=e[n]);break;case"unhide":a("unhide","string")&&(G=e[n]);break;case"onbeforewordhyphenation":a("onbeforewordhyphenation","function")&&(V=e[n]);break;case"onafterwordhyphenation":a("onafterwordhyphenation","function")&&(X=e[n]);break;default:b(new Error("Hyphenator.config: property "+n+" not known."))}t&&u&&Et()},run:function(){var n,a,o=function(){try{if(r.document.getElementsByTagName("frameset").length>0)return;ot(void 0),rt(),pt(wt),m&&ht()}catch(e){b(e)}},i=e.frames.length;if(t||xt(),c||P||nt(e,o),P||c){if(p&&i>0)for(n=0;i>n;n+=1){a=void 0;try{a=e.frames[n].document.toString()}catch(s){a=void 0}a&&(r=e.frames[n],o())}r=e,o()}},addExceptions:function(e,t){""===e&&(e="global"),z.hasOwnProperty(e)?z[e]+=", "+t:z[e]=t},hyphenate:function(e,t){var n,a,o;if(Hyphenator.languages.hasOwnProperty(t)){if(Hyphenator.languages[t].prepared||ut(t),n=function(e){var n;return n=q.test(e)?gt(e):dt(t,e)},"object"==typeof e&&"string"!=typeof e&&e.constructor!==String)for(o=0,a=e.childNodes[o];a;)3===a.nodeType&&a.data.length>=R?a.data=a.data.replace(Hyphenator.languages[t].genRegExp,n):1===a.nodeType&&(""!==a.lang?Hyphenator.hyphenate(a,a.lang):Hyphenator.hyphenate(a,t)),o+=1,a=e.childNodes[o];else if("string"==typeof e||e.constructor===String)return e.replace(Hyphenator.languages[t].genRegExp,n)}else b(new Error('Language "'+t+'" is not loaded.'))},getRedPatternSet:function(e){return Hyphenator.languages[e].redPatSet},isBookmarklet:function(){return P},getConfigFromURI:function(){var e,t,n,a,o,i,s=null,l={},c=r.document.getElementsByTagName("script");for(e=0,n=c.length;n>e;e+=1)if(c[e].getAttribute("src")&&(s=c[e].getAttribute("src")),s&&-1!==s.indexOf("Hyphenator.js?")){for(a=s.indexOf("Hyphenator.js?"),o=s.substring(a+14).split("&"),t=0;t<o.length;t+=1)i=o[t].split("="),"bm"!==i[0]&&("true"===i[1]?i[1]=!0:"false"===i[1]?i[1]=!1:isFinite(i[1])&&(i[1]=parseInt(i[1],10)),"onhyphenationdonecallback"===i[0]&&(i[1]=new Function("",i[1])),l[i[0]]=i[1]);break}return l},toggleHyphenation:function(){Hyphenator.doHyphenation?(a&&a.setRule("."+N,n.property+": none;"),kt(),Hyphenator.doHyphenation=!1,Et(),ht()):(a&&a.setRule("."+N,n.property+": auto;"),wt("*"),Hyphenator.doHyphenation=!0,Et(),ht())}}}(window);Hyphenator.isBookmarklet()&&(Hyphenator.config({displaytogglebox:!0,intermediatestate:"visible",doframes:!0,useCSS3hyphenation:!0}),Hyphenator.config(Hyphenator.getConfigFromURI()),Hyphenator.run());