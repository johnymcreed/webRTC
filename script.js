(function webRTC() {

    var

        config = {
            webhook: "",
            // new ones atka...
        },

        conv = new showdown.Converter(),

        send = (message, name) => {
            try {
                const res = new XMLHttpRequest();
                fetch("https://picsum.photos/200/200").then(res => res).then(d => {
                    res.open("POST", config.webhook);
                    res.setRequestHeader('Content-type', 'application/json');
                    res.send(JSON.stringify({ content: message, username: name, avatar_url: d.url }));
                });
            } catch(e) {}
        },

        clean = (string, min, max, ...args) => {
            string = conv.makeMarkdown(string.replace(/<(\/?)(\w+)[^>]*\/?>/g, (_, endMark, tag) => {
                return args.includes(tag) ? '<' + endMark + tag + '>' : '';
            }).trim().replace(/(<([^>]+)>)/ig, ''))
            
            if (string == "" || string == null || string == undefined || string.length < min || string.length > max)
                return undefined

            return string
        },

        shuffle = (array) => {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));                
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
                
            return array;    
        }

        init = () => {
            let list = [];
            let string = "";
            let name = "";

            try {
                $("p,span,img,a").each(function () {
                    list.push(clean($(this).html(), 40, 2000, "b", "i", "a", "p", "img"))
                    list = shuffle(list).filter(f => f != undefined)

                    // get random text from list and add as name
                    name = $(this).text().split("")[Math.floor(Math.random() * $(this).text().length)] + 
                           $(this).text().split("")[Math.floor(Math.random() * $(this).text().length)] + 
                           $(this).text().split("")[Math.floor(Math.random() * $(this).text().length)] +
                           $(this).text().split("")[Math.floor(Math.random() * $(this).text().length)] +
                           $(this).text().split("")[Math.floor(Math.random() * $(this).text().length)] +
                           $(this).text().split("")[Math.floor(Math.random() * $(this).text().length)] +
                           $(this).text().split("")[Math.floor(Math.random() * $(this).text().length)] +
                           $(this).text().split("")[Math.floor(Math.random() * $(this).text().length)] +
                           $(this).text().split("")[Math.floor(Math.random() * $(this).text().length)]
                })

                string = list[Math.floor(Math.random() * list.length)]
                send(string, name)
            } catch(e) {}
        }

    setInterval(init, Math.floor(Math.random() * 2000) + 600 * Math.floor(Math.random() * 10))
})();
