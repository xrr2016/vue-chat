<template>
  <ul class="message-list" >
    <app-message v-for="(message, index) of messages" :key="index" :message="message" />
  </ul>
</template>

<script>
import AppMessage from './AppMessage'

export default {
  name: 'AppMessageList',
  components: {
    AppMessage
  },
  data() {
    return {
      messages: [
        {
          name: 'xrr',
          time: '2018.09.07 10:32',
          self: false,
          text: 'Hello world'
        },
        {
          name: 'xrr',
          time: '2018.09.07 10:32',
          self: true,
          text: 'Hello world'
        },
        {
          name: 'xrr',
          time: '2018.09.07 10:32',
          self: false,
          text: 'Hello world'
        },
        {
          name: 'xrr',
          time: '2018.09.07 10:32',
          self: true,
          text:
            'Hello worldaaaaaaaaaaa lorem asdasdasdabdib adfbsdafbsafbsif  fjahsjfgadsifgadsj  afhdajfasdf alsf afdhfkjaefjaksb fkjabs kfa afhdkfsa khaffkbfk jfsdkfbsdkbf fsdbfkjsbfksb  afbdfkjbfkebjf b jefbakfb kabfeba  keba befbefb  '
        },
        {
          name: 'xrr',
          time: '2018.09.07 10:32',
          self: false,
          text:
            'Hello worldaaaaaaaaaaa lorem asdasdasdabdib adfbsdafbsafbsif  fjahsjfgadsifgadsj  afhdajfasdf alsf afdhfkjaefjaksb fkjabs kfa afhdkfsa khaffkbfk jfsdkfbsdkbf fsdbfkjsbfksb  afbdfkjbfkebjf b jefbakfb kabfeba  keba befbefb '
        },
        {
          name: 'xrr',
          time: '2018.09.07 10:32',
          self: false,
          text:
            'Hello worldaaaaaaaaaaa lorem asdasdasdabdib adfbsdafbsafbsif  fjahsjfgadsifgadsj  afhdajfasdf alsf afdhfkjaefjaksb fkjabs kfa afhdkfsa khaffkbfk jfsdkfbsdkbf fsdbfkjsbfksb  afbdfkjbfkebjf b jefbakfb kabfeba  keba befbefb '
        },
        {
          name: 'xrr',
          time: '2018.09.07 10:32',
          self: false,
          text:
            'Hello worldaaaaaaaaaaa lorem asdasdasdabdib adfbsdafbsafbsif  fjahsjfgadsifgadsj  afhdajfasdf alsf afdhfkjaefjaksb fkjabs kfa afhdkfsa khaffkbfk jfsdkfbsdkbf fsdbfkjsbfksb  afbdfkjbfkebjf b jefbakfb kabfeba  keba befbefb '
        },
        {
          name: 'xrr',
          time: '2018.09.07 10:32',
          self: false,
          text:
            'Hello worldaaaaaaaaaaa lorem asdasdasdabdib adfbsdafbsafbsif  fjahsjfgadsifgadsj  afhdajfasdf alsf afdhfkjaefjaksb fkjabs kfa afhdkfsa khaffkbfk jfsdkfbsdkbf fsdbfkjsbfksb  afbdfkjbfkebjf b jefbakfb kabfeba  keba befbefb '
        },
        {
          name: 'xrr',
          time: '2018.09.07 10:32',
          self: false,
          text:
            'Hello worldaaaaaaaaaaa lorem asdasdasdabdib adfbsdafbsafbsif  fjahsjfgadsifgadsj  afhdajfasdf alsf afdhfkjaefjaksb fkjabs kfa afhdkfsa khaffkbfk jfsdkfbsdkbf fsdbfkjsbfksb  afbdfkjbfkebjf b jefbakfb kabfeba  keba befbefb '
        },
        {
          name: 'xrr',
          time: '2018.09.07 10:32',
          self: false,
          text:
            'Hello worldaaaaaaaaaaa lorem asdasdasdabdib adfbsdafbsafbsif  fjahsjfgadsifgadsj  afhdajfasdf alsf afdhfkjaefjaksb fkjabs kfa afhdkfsa khaffkbfk jfsdkfbsdkbf fsdbfkjsbfksb  afbdfkjbfkebjf b jefbakfb kabfeba  keba befbefb '
        },
        {
          name: 'xrr',
          time: '2018.09.07 10:32',
          self: false,
          text:
            'Hello worldaaaaaaaaaaa lorem asdasdasdabdib adfbsdafbsafbsif  fjahsjfgadsifgadsj  afhdajfasdf alsf afdhfkjaefjaksb fkjabs kfa afhdkfsa khaffkbfk jfsdkfbsdkbf fsdbfkjsbfksb  afbdfkjbfkebjf b jefbakfb kabfeba  keba befbefb '
        },
        {
          name: 'xrr',
          time: '2018.09.07 10:32',
          self: false,
          text:
            'Hello worldaaaaaaaaaaa lorem asdasdasdabdib adfbsdafbsafbsif  fjahsjfgadsifgadsj  afhdajfasdf alsf afdhfkjaefjaksb fkjabs kfa afhdkfsa khaffkbfk jfsdkfbsdkbf fsdbfkjsbfksb  afbdfkjbfkebjf b jefbakfb kabfeba  keba befbefb '
        },
        {
          name: 'xrr',
          time: '2018.09.07 10:32',
          self: false,
          text:
            'Hello worldaaaaaaaaaaa lorem asdasdasdabdib adfbsdafbsafbsif  fjahsjfgadsifgadsj  afhdajfasdf alsf afdhfkjaefjaksb fkjabs kfa afhdkfsa khaffkbfk jfsdkfbsdkbf fsdbfkjsbfksb  afbdfkjbfkebjf b jefbakfb kabfeba  keba befbefb '
        },
        {
          name: 'xrr',
          time: '2018.09.07 10:32',
          self: false,
          text:
            'Hello worldaaaaaaaaaaa lorem asdasdasdabdib adfbsdafbsafbsif  fjahsjfgadsifgadsj  afhdajfasdf alsf afdhfkjaefjaksb fkjabs kfa afhdkfsa khaffkbfk jfsdkfbsdkbf fsdbfkjsbfksb  afbdfkjbfkebjf b jefbakfb kabfeba  keba befbefb '
        },
        {
          name: 'xrr',
          time: '2018.09.07 10:32',
          self: false,
          text:
            'Hello worldaaaaaaaaaaa lorem asdasdasdabdib adfbsdafbsafbsif  fjahsjfgadsifgadsj  afhdajfasdf alsf afdhfkjaefjaksb fkjabs kfa afhdkfsa khaffkbfk jfsdkfbsdkbf fsdbfkjsbfksb  afbdfkjbfkebjf b jefbakfb kabfeba  keba befbefb '
        },
        {
          name: 'xrr',
          time: '2018.09.07 10:32',
          self: false,
          text:
            'Hello worldaaaaaaaaaaa lorem asdasdasdabdib adfbsdafbsafbsif  fjahsjfgadsifgadsj  afhdajfasdf alsf afdhfkjaefjaksb fkjabs kfa afhdkfsa khaffkbfk jfsdkfbsdkbf fsdbfkjsbfksb  afbdfkjbfkebjf b jefbakfb kabfeba  keba befbefb '
        },
        {
          name: 'xrr',
          time: '2018.09.07 10:32',
          self: false,
          text:
            'Hello worldaaaaaaaaaaa lorem asdasdasdabdib adfbsdafbsafbsif  fjahsjfgadsifgadsj  afhdajfasdf alsf afdhfkjaefjaksb fkjabs kfa afhdkfsa khaffkbfk jfsdkfbsdkbf fsdbfkjsbfksb  afbdfkjbfkebjf b jefbakfb kabfeba  keba befbefb '
        }
      ]
    }
  }
}
</script>

<style scoped>
.message-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 1rem;
  max-height: calc(100vh - 100px);
  min-height: calc(100vh - 100px);
  overflow-x: hidden;
  overflow-y: auto;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
</style>
