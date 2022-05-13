dayjs.extend(window.dayjs_plugin_customParseFormat);

const app = new Vue({
  el: "#root",
  data:{
    contacts: [
      {
        name: "Michele",
        avatar: "_1",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            message: "Hai portato a spasso il cane?",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            message: "Ricordati di stendere i panni",
            status: "sent",
          },
          {
            date: "10/01/2020 16:15:22",
            message: "Tutto fatto!",
            status: "received",
          },
        ],
      },
      {
        name: "Fabio",
        avatar: "_2",
        visible: true,
        messages: [
          {
            date: "20/03/2020 16:30:00",
            message: "Ciao come stai?",
            status: "sent",
          },
          {
            date: "20/03/2020 16:30:55",
            message: "Bene grazie! Stasera ci vediamo?",
            status: "received",
          },
          {
            date: "20/03/2020 16:35:00",
            message: "Mi piacerebbe ma devo andare a fare la spesa.",
            status: "sent",
          },
        ],
      },
      {
        name: "Samuele",
        avatar: "_3",
        visible: true,
        messages: [
          {
            date: "28/03/2020 10:10:40",
            message: "La Marianna va in campagna",
            status: "received",
          },
          {
            date: "28/03/2020 10:20:10",
            message: "Sicuro di non aver sbagliato chat?",
            status: "sent",
          },
          {
            date: "28/03/2020 16:15:22",
            message: "Ah scusa!",
            status: "received",
          },
        ],
      },
      {
        name: "Alessandro B.",
        avatar: "_4",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            message: "Lo sai che ha aperto una nuova pizzeria?",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            message: "Si, ma preferirei andare al cinema",
            status: "received",
          },
        ],
      },
      {
        name: "Alessandro L.",
        avatar: "_5",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            message: "Ricordati di chiamare la nonna",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            message: "Va bene, stasera la sento",
            status: "received",
          },
        ],
      },
      {
        name: "Claudia",
        avatar: "_6",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            message: "Ciao Claudia, hai novità?",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            message: "Non ancora",
            status: "received",
          },
          {
            date: "10/01/2020 15:51:00",
            message: "Nessuna nuova, buona nuova",
            status: "sent",
          },
        ],
      },
      {
        name: "Federico",
        avatar: "_7",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            message: "Fai gli auguri a Martina che è il suo compleanno!",
            status: "sent",
          },
          {
            date: "10/01/2020 15:50:00",
            message: "Grazie per avermelo ricordato, le scrivo subito!",
            status: "received",
          },
        ],
      },
      {
        name: "Davide",
        avatar: "_8",
        visible: true,
        messages: [
          {
            date: "10/01/2020 15:30:55",
            message: "Ciao, andiamo a mangiare la pizza stasera?",
            status: "received",
          },
          {
            date: "10/01/2020 15:50:00",
            message: "No, l'ho già mangiata ieri, ordiniamo sushi!",
            status: "sent",
          },
          {
            date: "10/01/2020 15:51:00",
            message: "OK!!",
            status: "received",
          },
        ],
      },
    ],
    currentContact: 0,
    newMessage: '',
    searchText: '',
  },
  methods:{
    getChatLastMessage: function(contact, index){
      //se non ci sono messaggi creare un oggetto vuovo
      if(contact.messages.length === 0){
        return {
          message: '',
          time: '',
        }
      };
      //prendere l'ultimo messaggio dal contatto corrispondente
      const lastMessage = contact.messages[this.contacts[index].messages.length - 1]
      
      let lastMessageText = lastMessage.message;
      //troncare il messaggio se è troppo lungo
      if(lastMessageText.length >= 25){
        lastMessageText = lastMessageText.slice(0, 25) + '...';
      }
      // console.log(lastMessageText);

      //prendere l'orario del messaggio e formattarlo
      const time = this.getMessageTime(lastMessage.date)
      // console.log(time);
      return {
        message: lastMessageText,
        time: time
      }
    },

    changeCurrentContact: function (index){
      this.currentContact = index;
    },

    computerMessage: function(){
      const newObj = {
        date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
        message: 'Ok',
        status: 'received',
      }

      setTimeout(() => {
        this.contacts[this.currentContact].messages.push(newObj);
      }, 1000)
    },

    sendMessage: function(message){
      const newObj = {
        date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
        message: message,
        status: 'sent',
      }

      //inserire l'oggetto nell'array del contatto corrispondente
      this.contacts[this.currentContact].messages.push(newObj);
      //ripulire l'input
      this.newMessage = '';
      
      //ottenere risposta del computer
      this.computerMessage();

    },

    getMessageTime: function(date){
      //ritorna ora e minuti della data
      return dayjs(date, 'DD/MM/YYYY HH:mm:ss').format('HH:mm');
    },

    filterChat: function(){
      this.contacts.forEach((contact) => {

        if(contact.name.toLowerCase().includes(this.searchText.toLowerCase())){
          contact.visible = true;
        }else{
          contact.visible = false;

        }
      });
    },

    showOptionsMenu: function(index, event) {
      //bloccare la funzione se non è stato cliccato il messaggio
      if(event.target.nodeName !== 'DIV' && event.target.parentNode.nodeName !=='DIV')return;

      //prelevare il div del messaggio su cui si è cliccato
      const element = document.querySelectorAll('.message')[index];

      //aggiungere\rimuovere la classe active
      element.classList.toggle('menu-active');

      event.preventDefault();
    },

    removeOptionMenu: function(event){
      //togliere la classe menu-active al messaggio
      event.target.classList.remove('menu-active');

    },

    deleteMessage: function(contactIndex, messageIndex){
      this.contacts[contactIndex].messages.splice(messageIndex, 1);
    }
  }
});
