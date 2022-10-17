import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import { NaverLogin } from './components/molecules/NaverLogin/NaverLogin';
import ModalContainer from './components/organisms/ModalContainer/ModalContainer';
import { MainPage } from './pages/MainPage';
import 'react-toastify/dist/ReactToastify.css';
import { eventActions } from './store/modules/actions/event.action';
import stores from './store/configureStore';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    naver: any;
  }
}

function App() {
  // test data
  const insert = useRef<boolean>(false);
  useEffect(() => {
    if (insert.current) return;
    insert.current = true;

    stores.dispatch(
      eventActions.setEventItem({
        event: {
          id: '1',
          category: 'SAVE',
          name: '킵미 로션+크림 샘플이벤트',
          startDate: new Date('2022-10-14'),
          endDate: new Date('2022-10-15'),
          description: `<div class="se-main-container">
          <div class="se-component se-text se-l-default" id="SE-ac7862e8-4dba-11ed-a6fc-09b34fb638d6">
              <div class="se-component-content">
                  <div class="se-section se-section-text se-l-default">
                      <div class="se-module se-module-text">
                              <!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-99313d35-4dba-11ed-a6fc-934fd123851b"><span style="" class="se-fs- se-ff-   " id="SE-e1feaec1-4dbf-11ed-836c-510e890bbdee">안녕하세요</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-e1fcd9d8-4dbf-11ed-836c-25cd5bbe5379"><span style="" class="se-fs- se-ff-   " id="SE-e1feaec2-4dbf-11ed-836c-d3abfd10786c">돈요정 밍키언니입니다</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-e1fcd9da-4dbf-11ed-836c-01465f84c59b"><span style="" class="se-fs- se-ff-   " id="SE-e1fed5d3-4dbf-11ed-836c-a18c3b5e6d70">월욜은 집안일도 바쁜것 같죠?왜?</span></p><!-- } SE-TEXT -->
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-sticker se-l-default" id="SE-c32c834d-4dbf-11ed-836c-33338a5aa20a">
              <div class="se-component-content">
                  <div class="se-section se-section-sticker se-section-align-center se-l-default">
                      <div class="se-module se-module-sticker">
                          <a href="#" onclick="return false;" class="__se_sticker_link __se_link" data-linktype="sticker" data-linkdata="{&quot;src&quot; : &quot;https://storep-phinf.pstatic.net/ogq_5decaaa5a1f91/original_3.gif&quot;, &quot;packCode&quot; : &quot;ogq_5decaaa5a1f91&quot;, &quot;seq&quot; : &quot;3&quot;, &quot;width&quot; : &quot;370&quot;, &quot;height&quot; : &quot;320&quot;}">
                              <img src="https://storep-phinf.pstatic.net/ogq_5decaaa5a1f91/original_3.gif?type=pa50_50" alt="" class="se-sticker-image egjs-visible">
                          </a>
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-image se-l-default" id="SE-8c6e7c08-4dba-11ed-a6fc-276ebd30f589">
              <div class="se-component-content se-component-content-fit">
                  <div class="se-section se-section-image se-l-default se-section-align-center">
                          <div class="se-module se-module-image" style="">
                              <a class="se-module-image-link __se_image_link __se_link" style="" onclick="return false;" data-linktype="img" data-linkdata="{&quot;id&quot; : &quot;SE-8c6e7c08-4dba-11ed-a6fc-276ebd30f589&quot;, &quot;src&quot; : &quot;https://postfiles.pstatic.net/MjAyMjEwMTdfMjQz/MDAxNjY1OTY5OTE0NDc4.V4fj5Axv7uOoCBV_4LZLZUQobf48FQZ6q7AeUeLmo8Eg.xX47CVun0GHlpdroZWNPjZGjbfqzV_ANlMw4_hG9trcg.JPEG.dancing8462/20221017%EF%BC%BF101640.jpg&quot;, &quot;originalWidth&quot; : &quot;900&quot;, &quot;originalHeight&quot; : &quot;1113&quot;, &quot;linkUse&quot; : &quot;false&quot;, &quot;link&quot; : &quot;&quot;}" area-hidden="true">
                                  <img src="https://postfiles.pstatic.net/MjAyMjEwMTdfMjQz/MDAxNjY1OTY5OTE0NDc4.V4fj5Axv7uOoCBV_4LZLZUQobf48FQZ6q7AeUeLmo8Eg.xX47CVun0GHlpdroZWNPjZGjbfqzV_ANlMw4_hG9trcg.JPEG.dancing8462/20221017%EF%BC%BF101640.jpg?type=w773" data-lazy-src="" data-width="900" data-height="1113" alt="" class="se-image-resource egjs-visible">
                              </a>
                          </div>
                  </div>
              </div>
          </div>
          <div class="se-component se-text se-l-default" id="SE-bf0bb11c-4dbf-11ed-836c-11f872d5f321">
              <div class="se-component-content">
                  <div class="se-section se-section-text se-l-default">
                      <div class="se-module se-module-text">
                              <!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-e1fcd9dc-4dbf-11ed-836c-8574b4cf0e4d"><span style="" class="se-fs- se-ff-   " id="SE-e1fed5d4-4dbf-11ed-836c-6fc8a9e25907">킵미에서</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-e1fcd9de-4dbf-11ed-836c-ab7637da7d6d"><span style="" class="se-fs- se-ff-   " id="SE-e1fed5d5-4dbf-11ed-836c-6d6d1b0d9a24">로션과 크림 샘플이벤트를 해요</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-e1fcd9e0-4dbf-11ed-836c-d1f0ef6c7d3b"><span style="" class="se-fs- se-ff-   " id="SE-e1fed5d6-4dbf-11ed-836c-bb77dc01a8f7">조아쓰</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-e1fcd9e2-4dbf-11ed-836c-95408f2a7fde"><span style="" class="se-fs- se-ff-   " id="SE-e1fed5d7-4dbf-11ed-836c-9bf79ca286bb">무려 2종!</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-e1fcd9e4-4dbf-11ed-836c-c1984746cf40"><span style="" class="se-fs- se-ff-   " id="SE-e1fed5d8-4dbf-11ed-836c-0b921d807cdb">15ml짜리라서</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-e1fcd9e6-4dbf-11ed-836c-79b40b7aca23"><span style="" class="se-fs- se-ff-   " id="SE-e1fed5d9-4dbf-11ed-836c-59a2ea35fbbc">애들이랑 여행갈때 챗겨가면</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-e1fcd9e8-4dbf-11ed-836c-a31111801e4f"><span style="" class="se-fs- se-ff-   " id="SE-e1fed5da-4dbf-11ed-836c-215521a9ef21">딱?ㅎ</span></p><!-- } SE-TEXT -->
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-sticker se-l-default" id="SE-bf0ac6bb-4dbf-11ed-836c-c5dcce688cce">
              <div class="se-component-content">
                  <div class="se-section se-section-sticker se-section-align-center se-l-default">
                      <div class="se-module se-module-sticker">
                          <a href="#" onclick="return false;" class="__se_sticker_link __se_link" data-linktype="sticker" data-linkdata="{&quot;src&quot; : &quot;https://storep-phinf.pstatic.net/ogq_5decaaa5a1f91/original_16.gif&quot;, &quot;packCode&quot; : &quot;ogq_5decaaa5a1f91&quot;, &quot;seq&quot; : &quot;16&quot;, &quot;width&quot; : &quot;370&quot;, &quot;height&quot; : &quot;320&quot;}">
                              <img src="https://storep-phinf.pstatic.net/ogq_5decaaa5a1f91/original_16.gif?type=pa50_50" alt="" class="se-sticker-image egjs-visible">
                          </a>
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-image se-l-default" id="SE-8c6e7c09-4dba-11ed-a6fc-d932066515b3">
              <div class="se-component-content se-component-content-fit">
                  <div class="se-section se-section-image se-l-default se-section-align-center">
                          <div class="se-module se-module-image" style="">
                              <a class="se-module-image-link __se_image_link __se_link" style="" onclick="return false;" data-linktype="img" data-linkdata="{&quot;id&quot; : &quot;SE-8c6e7c09-4dba-11ed-a6fc-d932066515b3&quot;, &quot;src&quot; : &quot;https://postfiles.pstatic.net/MjAyMjEwMTdfOTQg/MDAxNjY1OTY5OTE0NDcx.4UuOhUkEtP3mdWxND7OK9aimDhBmB4DaPyYx0cNsjekg.Wh6hwqV1JFJWJEJZqtXreOtSsbkbdp02uSlce0YkFhcg.JPEG.dancing8462/20221017%EF%BC%BF101631.jpg&quot;, &quot;originalWidth&quot; : &quot;900&quot;, &quot;originalHeight&quot; : &quot;1174&quot;, &quot;linkUse&quot; : &quot;false&quot;, &quot;link&quot; : &quot;&quot;}" area-hidden="true">
                                  <img src="https://postfiles.pstatic.net/MjAyMjEwMTdfOTQg/MDAxNjY1OTY5OTE0NDcx.4UuOhUkEtP3mdWxND7OK9aimDhBmB4DaPyYx0cNsjekg.Wh6hwqV1JFJWJEJZqtXreOtSsbkbdp02uSlce0YkFhcg.JPEG.dancing8462/20221017%EF%BC%BF101631.jpg?type=w773" data-lazy-src="" data-width="900" data-height="1174" alt="" class="se-image-resource egjs-visible">
                              </a>
                          </div>
                  </div>
              </div>
          </div>
          <div class="se-component se-text se-l-default" id="SE-bbeda80e-4dbf-11ed-836c-bd2f99ceb8a8">
              <div class="se-component-content">
                  <div class="se-section se-section-text se-l-default">
                      <div class="se-module se-module-text">
                              <!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-e1fcd9ea-4dbf-11ed-836c-1d576795885b"><span style="" class="se-fs- se-ff-   " id="SE-e1fefceb-4dbf-11ed-836c-57c9b4cc9823">하는법</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-e1fcd9ec-4dbf-11ed-836c-0d748d1fb974"><span style="" class="se-fs- se-ff-   " id="SE-e1fefcec-4dbf-11ed-836c-831eef904460">1.회원가입</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-e1fcd9ee-4dbf-11ed-836c-71dbbed1a707"><span style="" class="se-fs- se-ff-   " id="SE-e1fefced-4dbf-11ed-836c-3f7eed12f9fd">2.이벤트창에 댓글 남기기</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-e1fcd9f0-4dbf-11ed-836c-11ac8fca2dba"><span style="" class="se-fs- se-ff-   " id="SE-e1fefcee-4dbf-11ed-836c-43d71a763eb1">3.카톡으로 정보보내기</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-e1fcd9f2-4dbf-11ed-836c-3de28b2c59e1"><span style="" class="se-fs- se-ff-   " id="SE-e1fefcef-4dbf-11ed-836c-113bbfa94873">4.예쁜 아기 발라주기</span></p><!-- } SE-TEXT -->
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-sticker se-l-default" id="SE-bbebac3d-4dbf-11ed-836c-f31fc0a96623">
              <div class="se-component-content">
                  <div class="se-section se-section-sticker se-section-align-center se-l-default">
                      <div class="se-module se-module-sticker">
                          <a href="#" onclick="return false;" class="__se_sticker_link __se_link" data-linktype="sticker" data-linkdata="{&quot;src&quot; : &quot;https://storep-phinf.pstatic.net/ogq_5decaaa5a1f91/original_11.gif&quot;, &quot;packCode&quot; : &quot;ogq_5decaaa5a1f91&quot;, &quot;seq&quot; : &quot;11&quot;, &quot;width&quot; : &quot;370&quot;, &quot;height&quot; : &quot;320&quot;}">
                              <img src="https://storep-phinf.pstatic.net/ogq_5decaaa5a1f91/original_11.gif?type=pa50_50" alt="" class="se-sticker-image egjs-visible">
                          </a>
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-text se-l-default" id="SE-d4f8a2e4-4dbf-11ed-836c-39e7c376d2ac">
              <div class="se-component-content">
                  <div class="se-section se-section-text se-l-default">
                      <div class="se-module se-module-text">
                              <!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-e1fcd9f4-4dbf-11ed-836c-a5ac220db40a"><span style="" class="se-fs- se-ff-   " id="SE-e1fefcf0-4dbf-11ed-836c-077cbaf7b855">그럼 필요하식분 해보세요</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-e1fcd9f6-4dbf-11ed-836c-ff4b907bf1e0"><span style="" class="se-fs- se-ff-   " id="SE-e1fefcf1-4dbf-11ed-836c-d9b5e05b88c9"><a href="https://m.keepme.co.kr/article/event/8/51/" class="se-link" target="_blank">https://m.keepme.co.kr/article/event/8/51/</a></span></p><!-- } SE-TEXT -->
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-oglink se-l-large_image __se-component" id="SE-d4f40f03-4dbf-11ed-836c-d9f5b1e5ca79">
              <div class="se-component-content">
                  <div class="se-section se-section-oglink se-l-large_image se-section-align-center">
                      <div class="se-module se-module-oglink">
                          <a href="https://m.keepme.co.kr/article/event/8/51/" class="se-oglink-thumbnail" target="_blank">
                              <img src="https://dthumb-phinf.pstatic.net/?src=%22https%3A%2F%2Fm.keepme.co.kr%2Fweb%2Fupload%2Fshare-image-1-519dca7f5ef928823a089d6ff2f396ae.jpg%22&amp;type=ff500_300" class="se-oglink-thumbnail-resource egjs-visible" alt="">
                          </a>
                          <a href="https://m.keepme.co.kr/article/event/8/51/" class="se-oglink-info" target="_blank">
                              <div class="se-oglink-info-container">
                                  <strong class="se-oglink-title">킵미</strong>
                                  <p class="se-oglink-summary">아빠가 만든 브랜드 킵미. 안전한 성분으로 온가족 모두를 위한 아빠 마음을 담은 킵미입니다.</p>
                                  <p class="se-oglink-url">m.keepme.co.kr</p>
                              </div>
                          </a>
                      </div>
                  </div>
              </div>
              <script type="text/data" class="__se_module_data" data-module="{&quot;type&quot;:&quot;v2_oglink&quot;, &quot;id&quot; :&quot;SE-d4f40f03-4dbf-11ed-836c-d9f5b1e5ca79&quot;, &quot;data&quot; : {&quot;link&quot; : &quot;https://m.keepme.co.kr/article/event/8/51/&quot;, &quot;isVideo&quot; : &quot;false&quot;, &quot;thumbnail&quot; : &quot;https://dthumb-phinf.pstatic.net/?src=%22https%3A%2F%2Fm.keepme.co.kr%2Fweb%2Fupload%2Fshare-image-1-519dca7f5ef928823a089d6ff2f396ae.jpg%22&amp;type=ff500_300&quot;}}"></script>
          </div>                <div class="se-component se-text se-l-default" id="SE-dd951359-4dbf-11ed-836c-ed51ff027a62">
              <div class="se-component-content">
                  <div class="se-section se-section-text se-l-default">
                      <div class="se-module se-module-text">
                              <!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-e1fcd9f8-4dbf-11ed-836c-e9869cbd3d3c"><span style="" class="se-fs- se-ff-   " id="SE-e1ff2402-4dbf-11ed-836c-35378b288321"><a href="http://pf.kakao.com/_xkGjhxj" class="se-link" target="_blank">http://pf.kakao.com/_xkGjhxj</a></span></p><!-- } SE-TEXT -->
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-oglink se-l-image __se-component" id="SE-dd94ec48-4dbf-11ed-836c-49c788b029ec">
              <div class="se-component-content">
                  <div class="se-section se-section-oglink se-l-image se-section-align-center">
                      <div class="se-module se-module-oglink">
                          <a href="http://pf.kakao.com/_xkGjhxj" class="se-oglink-thumbnail" target="_blank">
                              <img src="https://dthumb-phinf.pstatic.net/?src=%22http%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fb4mALK%2FbtrHaUFtkrP%2FXi61E99iDyMZ3ii0DwHac0%2Fimg_m.jpg%22&amp;type=ff120" class="se-oglink-thumbnail-resource egjs-visible" alt="">
                          </a>
                          <a href="http://pf.kakao.com/_xkGjhxj" class="se-oglink-info" target="_blank">
                              <div class="se-oglink-info-container">
                                  <strong class="se-oglink-title">킵미</strong>
                                  <p class="se-oglink-summary">나를 지켜줘! Keep Me</p>
                                  <p class="se-oglink-url">pf.kakao.com</p>
                              </div>
                          </a>
                      </div>
                  </div>
              </div>
              <script type="text/data" class="__se_module_data" data-module="{&quot;type&quot;:&quot;v2_oglink&quot;, &quot;id&quot; :&quot;SE-dd94ec48-4dbf-11ed-836c-49c788b029ec&quot;, &quot;data&quot; : {&quot;link&quot; : &quot;http://pf.kakao.com/_xkGjhxj&quot;, &quot;isVideo&quot; : &quot;false&quot;, &quot;thumbnail&quot; : &quot;https://dthumb-phinf.pstatic.net/?src=%22http%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fb4mALK%2FbtrHaUFtkrP%2FXi61E99iDyMZ3ii0DwHac0%2Fimg_m.jpg%22&amp;type=ff120&quot;}}"></script>
          </div>                    </div>`,
          status: '진행중',
          done: true,
          bold: false,
          hidden: false,
        },
      }),
    );

    stores.dispatch(
      eventActions.setEventItem({
        event: {
          id: '2',
          category: 'SAVE',
          name: '뚱뚱한 바나나우유 100원',
          startDate: new Date('2022-10-17'),
          endDate: new Date('2022-10-18'),
          description: `<div class="se-main-container">
          <div class="se-component se-text se-l-default" id="SE-42ac5f9f-4db7-11ed-b987-ef890b0ee288">
              <div class="se-component-content">
                  <div class="se-section se-section-text se-l-default">
                      <div class="se-module se-module-text">
                              <!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-justify " style="" id="SE-35fab512-4db7-11ed-b987-67f7c09165f8"><span style="" class="se-fs- se-ff-   " id="SE-4d386a32-4db7-11ed-b987-b5bfa6dca254">선착입니다</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-justify " style="" id="SE-4d366e58-4db7-11ed-b987-dd2eb0c8e87f"><span style="" class="se-fs- se-ff-   " id="SE-4d389143-4db7-11ed-b987-d538b73a7456">고고</span></p><!-- } SE-TEXT -->
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-imageStrip se-imageStrip2 se-l-default" id="SE-44f898db-4db7-11ed-b987-fd3862889013">
              <div class="se-component-content se-component-content-extend">
                  <div class="se-section se-section-imageStrip se-l-default">
                      <div class="se-imageStrip-container se-imageStrip-col-2">
                          <div class="se-module se-module-image" style="width:50.0%;">
                              <a class="se-module-image-link __se_image_link __se_link" style="" onclick="return false;" data-linktype="img" data-linkdata="{&quot;id&quot; : &quot;SE-42a6451c-4db7-11ed-b987-b189bde79aa6&quot;, &quot;src&quot; : &quot;https://postfiles.pstatic.net/MjAyMjEwMTdfMTc4/MDAxNjY1OTY4NTAyNDU4.hex9Y8tcyGAoyx43BbCF1Q5dTxhWLxERmdVOLpaYqEkg.EPKIqTIwVUr6iVPKDeCuL2ga4521D_5OU88e6ZjxIn8g.JPEG.dancing8462/Screenshot%EF%BC%BF20221017%EF%BC%8D100101%EF%BC%BFNAVER.jpg&quot;, &quot;originalWidth&quot; : &quot;900&quot;, &quot;originalHeight&quot; : &quot;1850&quot;, &quot;linkUse&quot; : &quot;false&quot;, &quot;link&quot; : &quot;&quot;}" area-hidden="true">
                                  <img src="https://postfiles.pstatic.net/MjAyMjEwMTdfMTc4/MDAxNjY1OTY4NTAyNDU4.hex9Y8tcyGAoyx43BbCF1Q5dTxhWLxERmdVOLpaYqEkg.EPKIqTIwVUr6iVPKDeCuL2ga4521D_5OU88e6ZjxIn8g.JPEG.dancing8462/Screenshot%EF%BC%BF20221017%EF%BC%8D100101%EF%BC%BFNAVER.jpg?type=w773" data-lazy-src="" data-width="900" data-height="1850" alt="" class="se-image-resource egjs-visible">
                              </a>
                          </div>
                          <div class="se-module se-module-image" style="width:50.0%;">
                              <a class="se-module-image-link __se_image_link __se_link" style="" onclick="return false;" data-linktype="img" data-linkdata="{&quot;id&quot; : &quot;SE-42a6933d-4db7-11ed-b987-6902caae8aed&quot;, &quot;src&quot; : &quot;https://postfiles.pstatic.net/MjAyMjEwMTdfMjgx/MDAxNjY1OTY4NTAyMzg4.ogXoYzngP87rjypVDg0BgfZVeDwJMSm-IowHtOfmCIgg.vRZkPrV990pTHnfQPHkkp6n5aBShLPqeGoIzuptzmzog.JPEG.dancing8462/Screenshot%EF%BC%BF20221017%EF%BC%8D100056%EF%BC%BFNAVER.jpg&quot;, &quot;originalWidth&quot; : &quot;900&quot;, &quot;originalHeight&quot; : &quot;1850&quot;, &quot;linkUse&quot; : &quot;false&quot;, &quot;link&quot; : &quot;&quot;}" area-hidden="true">
                                  <img src="https://postfiles.pstatic.net/MjAyMjEwMTdfMjgx/MDAxNjY1OTY4NTAyMzg4.ogXoYzngP87rjypVDg0BgfZVeDwJMSm-IowHtOfmCIgg.vRZkPrV990pTHnfQPHkkp6n5aBShLPqeGoIzuptzmzog.JPEG.dancing8462/Screenshot%EF%BC%BF20221017%EF%BC%8D100056%EF%BC%BFNAVER.jpg?type=w773" data-lazy-src="" data-width="900" data-height="1850" alt="" class="se-image-resource egjs-visible">
                              </a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-image se-l-default" id="SE-42a6e15e-4db7-11ed-b987-5101408d48dd">
              <div class="se-component-content se-component-content-fit">
                  <div class="se-section se-section-image se-l-default se-section-align-left">
                          <div class="se-module se-module-image" style="">
                              <a class="se-module-image-link __se_image_link __se_link" style="" onclick="return false;" data-linktype="img" data-linkdata="{&quot;id&quot; : &quot;SE-42a6e15e-4db7-11ed-b987-5101408d48dd&quot;, &quot;src&quot; : &quot;https://postfiles.pstatic.net/MjAyMjEwMTdfMjc5/MDAxNjY1OTY4NTAyNDA0.4cC3O-eYobaICIE6ckucIJSC0NRe7Oogw1-XNMLVilUg.j8PtjzZUS4zxJAhXWVGTX0mFFHCu5KktJeqNLe2OikAg.JPEG.dancing8462/Screenshot%EF%BC%BF20221017%EF%BC%8D100050%EF%BC%BFNAVER.jpg&quot;, &quot;originalWidth&quot; : &quot;900&quot;, &quot;originalHeight&quot; : &quot;1850&quot;, &quot;linkUse&quot; : &quot;false&quot;, &quot;link&quot; : &quot;&quot;}" area-hidden="true">
                                  <img src="https://postfiles.pstatic.net/MjAyMjEwMTdfMjc5/MDAxNjY1OTY4NTAyNDA0.4cC3O-eYobaICIE6ckucIJSC0NRe7Oogw1-XNMLVilUg.j8PtjzZUS4zxJAhXWVGTX0mFFHCu5KktJeqNLe2OikAg.JPEG.dancing8462/Screenshot%EF%BC%BF20221017%EF%BC%8D100050%EF%BC%BFNAVER.jpg?type=w773" data-lazy-src="" data-width="900" data-height="1850" alt="" class="se-image-resource egjs-visible">
                              </a>
                          </div>
                  </div>
              </div>
          </div>
          <div class="se-component se-text se-l-default" id="SE-48df4908-4db7-11ed-b987-6fa355a98127">
              <div class="se-component-content">
                  <div class="se-section se-section-text se-l-default">
                      <div class="se-module se-module-text">
                              <!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align- " style="" id="SE-4d366e5a-4db7-11ed-b987-e975a2831c7d"><span style="" class="se-fs- se-ff-   " id="SE-4d38b854-4db7-11ed-b987-5d262e686653">GS25 : 브랜드스토어
</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align- " style="" id="SE-4d366e5c-4db7-11ed-b987-8b908496115b"><span style="" class="se-fs- se-ff-   " id="SE-4d38b855-4db7-11ed-b987-6db97db196de"> - </span><span style="" class="se-fs- se-ff-   " id="SE-4d38b856-4db7-11ed-b987-093dcf1be0e7"><a href="https://naver.me/GLAroNCy" class="se-link" target="_blank">https://naver.me/GLAroNCy</a></span></p><!-- } SE-TEXT -->
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-oglink se-l-large_image __se-component" id="SE-48df21f7-4db7-11ed-b987-c10b8780e0c0">
              <div class="se-component-content">
                  <div class="se-section se-section-oglink se-l-large_image se-section-align-left">
                      <div class="se-module se-module-oglink">
                          <a href="https://naver.me/GLAroNCy" class="se-oglink-thumbnail" target="_blank">
                              <img src="https://dthumb-phinf.pstatic.net/?src=%22https%3A%2F%2Fshop-phinf.pstatic.net%2F20210115_8%2F1610697187614sC7nw_JPEG%2F11833015443035679_1992649924.jpg%3Ftype%3Do1000%22&amp;type=ff500_300" class="se-oglink-thumbnail-resource egjs-visible" alt="">
                          </a>
                          <a href="https://naver.me/GLAroNCy" class="se-oglink-info" target="_blank">
                              <div class="se-oglink-info-container">
                                  <strong class="se-oglink-title">GS25 : 브랜드스토어</strong>
                                  <p class="se-oglink-summary">GS25</p>
                                  <p class="se-oglink-url">naver.me</p>
                              </div>
                          </a>
                      </div>
                  </div>
              </div>
              <script type="text/data" class="__se_module_data" data-module="{&quot;type&quot;:&quot;v2_oglink&quot;, &quot;id&quot; :&quot;SE-48df21f7-4db7-11ed-b987-c10b8780e0c0&quot;, &quot;data&quot; : {&quot;link&quot; : &quot;https://naver.me/GLAroNCy&quot;, &quot;isVideo&quot; : &quot;false&quot;, &quot;thumbnail&quot; : &quot;https://dthumb-phinf.pstatic.net/?src=%22https%3A%2F%2Fshop-phinf.pstatic.net%2F20210115_8%2F1610697187614sC7nw_JPEG%2F11833015443035679_1992649924.jpg%3Ftype%3Do1000%22&amp;type=ff500_300&quot;}}"></script>
          </div>                <div class="se-component se-text se-l-default" id="SE-48df701e-4db7-11ed-b987-5188aa3aebc1">
              <div class="se-component-content">
                  <div class="se-section se-section-text se-l-default">
                      <div class="se-module se-module-text">
                              <!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align- " style="" id="SE-4d36956f-4db7-11ed-b987-0d2c8868a535"><span style="" class="se-fs- se-ff-   " id="SE-4d38b857-4db7-11ed-b987-ffb05b474b51"></span></p><!-- } SE-TEXT -->
                      </div>
                  </div>
              </div>
          </div>    </div>`,
          status: '완료',
          done: true,
          bold: false,
          hidden: false,
        },
      }),
    );

    stores.dispatch(
      eventActions.setEventItem({
        event: {
          id: '3',
          category: 'INCOME',
          name: '10월 안국건강 아이원위크 혜택이벤트',
          startDate: new Date('2022-10-15'),
          endDate: new Date('2022-10-17'),
          description: `<div class="se-main-container">
          <div class="se-component se-text se-l-default" id="SE-fee7e924-9ded-4d1e-a9f2-ca575dddf5ee">
              <div class="se-component-content">
                  <div class="se-section se-section-text se-l-default">
                      <div class="se-module se-module-text">
                              <!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-93cf4522-8f96-46c4-a920-dcf5057f748f"><span style="" class="se-fs-fs19 se-ff-   " id="SE-934fa9de-4d2a-11ed-8a7b-2bcd672e4a6f"><b>안녕하세요 </b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-9a4e3596-13cd-4ffe-bbc1-150d50141752"><span style="" class="se-fs-fs19 se-ff-   " id="SE-934fd0ef-4d2a-11ed-8a7b-b58d628b8914"><b>돈요정 밍키언니입니다 </b></span></p><!-- } SE-TEXT -->
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-sticker se-l-default" id="SE-6e8406b3-2958-47c5-a0c1-3131a1066795">
              <div class="se-component-content">
                  <div class="se-section se-section-sticker se-section-align-center se-l-default">
                      <div class="se-module se-module-sticker">
                          <a href="#" onclick="return false;" class="__se_sticker_link __se_link" data-linktype="sticker" data-linkdata="{&quot;src&quot; : &quot;https://storep-phinf.pstatic.net/ogq_5a7a1f79dc8ab/original_7.png&quot;, &quot;packCode&quot; : &quot;ogq_5a7a1f79dc8ab&quot;, &quot;seq&quot; : &quot;7&quot;, &quot;width&quot; : &quot;185&quot;, &quot;height&quot; : &quot;160&quot;}">
                              <img src="https://storep-phinf.pstatic.net/ogq_5a7a1f79dc8ab/original_7.png?type=p100_100" alt="" class="se-sticker-image egjs-visible">
                          </a>
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-text se-l-default" id="SE-1c1ec8a0-e338-4241-ad0d-f9a33114244f">
              <div class="se-component-content">
                  <div class="se-section se-section-text se-l-default">
                      <div class="se-module se-module-text">
                              <!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-9a1e9457-e428-4fae-8e0b-b3cdec4471b3"><span style="" class="se-fs-fs19 se-ff-   " id="SE-934ff800-4d2a-11ed-8a7b-ef37ce0d0095"><b>구독자님들 </b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-fe3ca974-da25-479e-a13e-99f268f238f6"><span style="" class="se-fs-fs19 se-ff-   " id="SE-934ff801-4d2a-11ed-8a7b-19ccd1fb5470"><b>영앙제로 건강 챙기고 계시죠?</b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-ad12a42f-4e5b-47b5-8740-e42dc4d2ff66"><span style="" class="se-fs-fs19 se-ff-   " id="SE-934ff802-4d2a-11ed-8a7b-bb83e750cbb5"><b>영양제로 유명한 안국건강에서 </b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c5943e35-a6cf-48c8-a48f-288dddefcdcd"><span style="" class="se-fs-fs19 se-ff-   " id="SE-934ff803-4d2a-11ed-8a7b-0145c9aa81ea"><b>10월 17일까지 </b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-9858fa6b-ab93-4100-a02e-c706c6e968b3"><span style="" class="se-fs-fs19 se-ff-   " id="SE-93501f14-4d2a-11ed-8a7b-d9cecdaf2943"><b>아이원위크 이벤트를 진행해요</b></span><span style="" class="se-fs-fs19 se-ff-   " id="SE-93501f15-4d2a-11ed-8a7b-179dff76243e"><b></b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-15bef580-5a79-41e9-a3ec-b1d3829cea78"><span style="" class="se-fs-fs19 se-ff-   " id="SE-93501f16-4d2a-11ed-8a7b-11428f86702b"><b></b></span></p><!-- } SE-TEXT -->
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-sticker se-l-default" id="SE-f7cb4461-10f0-473d-9ef8-d9e97a983ec7">
              <div class="se-component-content">
                  <div class="se-section se-section-sticker se-section-align-center se-l-default">
                      <div class="se-module se-module-sticker">
                          <a href="#" onclick="return false;" class="__se_sticker_link __se_link" data-linktype="sticker" data-linkdata="{&quot;src&quot; : &quot;https://storep-phinf.pstatic.net/ogq_5a7a1f79dc8ab/original_11.png&quot;, &quot;packCode&quot; : &quot;ogq_5a7a1f79dc8ab&quot;, &quot;seq&quot; : &quot;11&quot;, &quot;width&quot; : &quot;185&quot;, &quot;height&quot; : &quot;160&quot;}">
                              <img src="https://storep-phinf.pstatic.net/ogq_5a7a1f79dc8ab/original_11.png?type=p100_100" alt="" class="se-sticker-image egjs-visible">
                          </a>
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-text se-l-default" id="SE-42b208cc-5df3-4b71-b8b6-559b046fb7b8">
              <div class="se-component-content">
                  <div class="se-section se-section-text se-l-default">
                      <div class="se-module se-module-text">
                              <!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c1e742f7-48f1-4cce-9f3f-0b280f2c60dc"><span style="" class="se-fs-fs19 se-ff-   " id="SE-93501f17-4d2a-11ed-8a7b-17daca41c335"><b>10월 아이원위크의 선물같은 </b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-899d9d27-d49c-4f85-8e02-3fb68e1620a6"><span style="" class="se-fs-fs19 se-ff-   " id="SE-93501f18-4d2a-11ed-8a7b-7b6c659ba13d"><b>혜택을 알려드리자면  </b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-3c698cbd-a8a4-448a-9e74-06685df05c6a"><span style="" class="se-fs-fs19 se-ff-   " id="SE-93504629-4d2a-11ed-8a7b-5b7a344ac146"><b></b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-a8003e88-3310-4498-b04a-8c270f2393e0"><span style="" class="se-fs-fs19 se-ff-   " id="SE-9350462a-4d2a-11ed-8a7b-f13992e5a684"><b>1.쿠폰팩</b></span></p><!-- } SE-TEXT -->
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-image se-l-default" id="SE-209ab708-62e2-4f9f-b690-b2d9cf780237">
              <div class="se-component-content se-component-content-normal">
                  <div class="se-section se-section-image se-l-default se-section-align-center" style="max-width:494px;">
                          <div class="se-module se-module-image" style="">
                              <a class="se-module-image-link __se_image_link __se_link" style="" onclick="return false;" data-linktype="img" data-linkdata="{&quot;id&quot; : &quot;SE-209ab708-62e2-4f9f-b690-b2d9cf780237&quot;, &quot;src&quot; : &quot;https://postfiles.pstatic.net/MjAyMjEwMTZfNzUg/MDAxNjY1OTA0MzYzNDEw.zmyEhpxFaoTHylShd6dvlK58lPahDfzvfRopIQr7Mbgg.F6QNVSqdOyvHtUollfGzRsuGDgdjFk0dgtud971Htg8g.PNG.dancing8462/image.png&quot;, &quot;originalWidth&quot; : &quot;494&quot;, &quot;originalHeight&quot; : &quot;731&quot;, &quot;linkUse&quot; : &quot;false&quot;, &quot;link&quot; : &quot;&quot;}" area-hidden="true">
                                  <img src="https://postfiles.pstatic.net/MjAyMjEwMTZfNzUg/MDAxNjY1OTA0MzYzNDEw.zmyEhpxFaoTHylShd6dvlK58lPahDfzvfRopIQr7Mbgg.F6QNVSqdOyvHtUollfGzRsuGDgdjFk0dgtud971Htg8g.PNG.dancing8462/image.png?type=w773" data-lazy-src="" data-width="494" data-height="731" alt="" class="se-image-resource egjs-visible">
                              </a>
                          </div>
                  </div>
              </div>
          </div>
          <div class="se-component se-text se-l-default" id="SE-edfb4572-2912-40a5-b077-fe48e60d99e2">
              <div class="se-component-content">
                  <div class="se-section se-section-text se-l-default">
                      <div class="se-module se-module-text">
                              <!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-1ac1b33d-e2c6-4f65-bcf1-ea986e0d5b46"><span style="" class="se-fs-fs19 se-ff-   " id="SE-9350462b-4d2a-11ed-8a7b-037cf62b4d26"><b>아이원위크의 첫번째 혜택!</b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-29f18648-ccf0-4ca9-b585-746a5d16f9bf"><span style="" class="se-fs-fs19 se-ff-   " id="SE-9350462c-4d2a-11ed-8a7b-755680569d34"><b>안국건강 회원이라면 누구나</b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-50bef470-9180-4868-a4eb-f3c0b1bbe45b"><span style="" class="se-fs-fs19 se-ff-   " id="SE-93506d3d-4d2a-11ed-8a7b-9b7167e4681d"><b>다운 받을 수 있는 쿠폰팩으로 조금 더 저렴하게 </b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-9fd00740-39e2-4c1a-9dbd-52b58c8f0af3"><span style="" class="se-fs-fs19 se-ff-   " id="SE-93506d3e-4d2a-11ed-8a7b-3b834da2404f"><b>평소 필요하셨던 영양제를 구매하실수 있답니다 </b></span></p><!-- } SE-TEXT -->
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-sticker se-l-default" id="SE-fc119e8d-a954-4c0e-b1df-11cb8fdd4593">
              <div class="se-component-content">
                  <div class="se-section se-section-sticker se-section-align-center se-l-default">
                      <div class="se-module se-module-sticker">
                          <a href="#" onclick="return false;" class="__se_sticker_link __se_link" data-linktype="sticker" data-linkdata="{&quot;src&quot; : &quot;https://storep-phinf.pstatic.net/ogq_5a7a1f79dc8ab/original_6.png&quot;, &quot;packCode&quot; : &quot;ogq_5a7a1f79dc8ab&quot;, &quot;seq&quot; : &quot;6&quot;, &quot;width&quot; : &quot;185&quot;, &quot;height&quot; : &quot;160&quot;}">
                              <img src="https://storep-phinf.pstatic.net/ogq_5a7a1f79dc8ab/original_6.png?type=p100_100" alt="" class="se-sticker-image egjs-visible">
                          </a>
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-text se-l-default" id="SE-da89ac12-3632-45c4-a070-30a3e49bfc77">
              <div class="se-component-content">
                  <div class="se-section se-section-text se-l-default">
                      <div class="se-module se-module-text">
                              <!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-136f5b12-1eb8-4d71-a968-fbfc6e9bd546"><span style="" class="se-fs-fs19 se-ff-   " id="SE-93506d3f-4d2a-11ed-8a7b-fddf1bf7db37"><b></b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-6b146fe4-7c08-410e-a35f-e1c82123280b"><span style="" class="se-fs-fs19 se-ff-   " id="SE-93506d40-4d2a-11ed-8a7b-2b321283170e"><b>2. 원플원</b></span></p><!-- } SE-TEXT -->
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-image se-l-default" id="SE-6df685aa-b415-4708-a3a4-a87e092d836b">
              <div class="se-component-content se-component-content-normal">
                  <div class="se-section se-section-image se-l-default se-section-align-center" style="max-width:397px;">
                          <div class="se-module se-module-image" style="">
                              <a class="se-module-image-link __se_image_link __se_link" style="" onclick="return false;" data-linktype="img" data-linkdata="{&quot;id&quot; : &quot;SE-6df685aa-b415-4708-a3a4-a87e092d836b&quot;, &quot;src&quot; : &quot;https://postfiles.pstatic.net/MjAyMjEwMTZfMjYg/MDAxNjY1OTA0MzY5MDU1.mmd7wYLjeZV_bjKTHKm3pYBsK2Gp6AaKY9x4z5xInSAg.50x2n46p6yeNHoOPjCHJjMMfiC9pgBoLi_jrHNPTuP8g.PNG.dancing8462/image.png&quot;, &quot;originalWidth&quot; : &quot;397&quot;, &quot;originalHeight&quot; : &quot;956&quot;, &quot;linkUse&quot; : &quot;false&quot;, &quot;link&quot; : &quot;&quot;}" area-hidden="true">
                                  <img src="https://postfiles.pstatic.net/MjAyMjEwMTZfMjYg/MDAxNjY1OTA0MzY5MDU1.mmd7wYLjeZV_bjKTHKm3pYBsK2Gp6AaKY9x4z5xInSAg.50x2n46p6yeNHoOPjCHJjMMfiC9pgBoLi_jrHNPTuP8g.PNG.dancing8462/image.png?type=w80_blur" data-lazy-src="https://postfiles.pstatic.net/MjAyMjEwMTZfMjYg/MDAxNjY1OTA0MzY5MDU1.mmd7wYLjeZV_bjKTHKm3pYBsK2Gp6AaKY9x4z5xInSAg.50x2n46p6yeNHoOPjCHJjMMfiC9pgBoLi_jrHNPTuP8g.PNG.dancing8462/image.png?type=w773" data-width="397" data-height="956" alt="" class="se-image-resource egjs-visible">
                              </a>
                          </div>
                  </div>
              </div>
          </div>
          <div class="se-component se-text se-l-default" id="SE-01ec6565-4c37-4f93-acbe-d5d78e4f9709">
              <div class="se-component-content">
                  <div class="se-section se-section-text se-l-default">
                      <div class="se-module se-module-text">
                              <!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-09ea034b-b55f-491d-ae96-1c362b7a6e55"><span style="" class="se-fs-fs19 se-ff-   " id="SE-93509451-4d2a-11ed-8a7b-9126ba2420dc"><b>안국건강하면?</b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-d61d0b9b-89c9-4f25-997d-bacddcf2eeab"><span style="" class="se-fs-fs19 se-ff-   " id="SE-93509452-4d2a-11ed-8a7b-d79ca80bbe73"><b>뭐니뭐니 해도 루테인이죵?</b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-e31832a5-9270-4ff6-93e4-d25fc830f109"><span style="" class="se-fs-fs19 se-ff-   " id="SE-93509453-4d2a-11ed-8a7b-bb5b4797b017"><b>루테인 1+1이벤트를 하고요 </b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-79dd200e-2172-4454-a5e9-435a271953d0"><span style="" class="se-fs-fs19 se-ff-   " id="SE-93509454-4d2a-11ed-8a7b-c789b8c03ade"><b>엽산도 원플원 이벤트를 해서</b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-2cd0c82c-2a45-41d0-96d5-c39bb588e986"><span style="" class="se-fs-fs19 se-ff-   " id="SE-93509455-4d2a-11ed-8a7b-69a8f6a69b26"><b>50% 할인체감으로 구매하실 수 있어요 </b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-eaeb1df2-5a2d-4209-a3f2-9cb2849951de"><span style="" class="se-fs-fs19 se-ff-   " id="SE-9350bb66-4d2a-11ed-8a7b-3341e7deb8e1"><b>우리같이 폰 많이 보는 현대인들에게 루테인은 필수예요 </b></span></p><!-- } SE-TEXT -->
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-sticker se-l-default" id="SE-aa4663ba-bbc5-4ea9-bad7-881769c1bb11">
              <div class="se-component-content">
                  <div class="se-section se-section-sticker se-section-align-center se-l-default">
                      <div class="se-module se-module-sticker">
                          <a href="#" onclick="return false;" class="__se_sticker_link __se_link" data-linktype="sticker" data-linkdata="{&quot;src&quot; : &quot;https://storep-phinf.pstatic.net/ogq_5a7a1f79dc8ab/original_8.png&quot;, &quot;packCode&quot; : &quot;ogq_5a7a1f79dc8ab&quot;, &quot;seq&quot; : &quot;8&quot;, &quot;width&quot; : &quot;185&quot;, &quot;height&quot; : &quot;160&quot;}">
                              <img src="https://storep-phinf.pstatic.net/ogq_5a7a1f79dc8ab/original_8.png?type=p100_100" alt="" class="se-sticker-image egjs-visible">
                          </a>
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-text se-l-default" id="SE-516e2282-95cf-4710-8e9f-874e178da12b">
              <div class="se-component-content">
                  <div class="se-section se-section-text se-l-default">
                      <div class="se-module se-module-text">
                              <!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-4f75598e-5ef4-4c15-a57a-afc08365df9f"><span style="" class="se-fs-fs19 se-ff-   " id="SE-9350bb67-4d2a-11ed-8a7b-35a519426b9f"><b>저 요즘 눈이 침침해진게 느껴진다능...</b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-b738fd0c-536a-4e6c-af1a-97a725f71cbe"><span style="" class="se-fs-fs19 se-ff-   " id="SE-9350bb68-4d2a-11ed-8a7b-2f84f3641965"><b>더 잘 챙겨먹어야 겠어요 </b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-4ead5224-f4d9-4122-b0c0-5228accae312"><span style="" class="se-fs-fs19 se-ff-   " id="SE-9350bb69-4d2a-11ed-8a7b-73d8fda492f5"><b></b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-9c616f17-60a2-4021-b9bf-57d131c5f7ba"><span style="" class="se-fs-fs19 se-ff-   " id="SE-9350e27a-4d2a-11ed-8a7b-a32086c9de84"><b>3. 최대60%할인</b></span></p><!-- } SE-TEXT -->
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-image se-l-default" id="SE-af4f788c-bf6d-4ae5-8dca-501d491a1e8f">
              <div class="se-component-content se-component-content-normal">
                  <div class="se-section se-section-image se-l-default se-section-align-center" style="max-width:445px;">
                          <div class="se-module se-module-image" style="">
                              <a class="se-module-image-link __se_image_link __se_link" style="" onclick="return false;" data-linktype="img" data-linkdata="{&quot;id&quot; : &quot;SE-af4f788c-bf6d-4ae5-8dca-501d491a1e8f&quot;, &quot;src&quot; : &quot;https://postfiles.pstatic.net/MjAyMjEwMTZfMjM3/MDAxNjY1OTA0MzcyODc1.HQWtWnirpcxIY2BfY0lvnTLDt7BCBqnEs1HjVkwjlUwg.jNi2zygxVTWrahN3HyrNijauqTtArme5Fgm7rlzijXsg.PNG.dancing8462/image.png&quot;, &quot;originalWidth&quot; : &quot;445&quot;, &quot;originalHeight&quot; : &quot;952&quot;, &quot;linkUse&quot; : &quot;false&quot;, &quot;link&quot; : &quot;&quot;}" area-hidden="true">
                                  <img src="https://postfiles.pstatic.net/MjAyMjEwMTZfMjM3/MDAxNjY1OTA0MzcyODc1.HQWtWnirpcxIY2BfY0lvnTLDt7BCBqnEs1HjVkwjlUwg.jNi2zygxVTWrahN3HyrNijauqTtArme5Fgm7rlzijXsg.PNG.dancing8462/image.png?type=w80_blur" data-lazy-src="https://postfiles.pstatic.net/MjAyMjEwMTZfMjM3/MDAxNjY1OTA0MzcyODc1.HQWtWnirpcxIY2BfY0lvnTLDt7BCBqnEs1HjVkwjlUwg.jNi2zygxVTWrahN3HyrNijauqTtArme5Fgm7rlzijXsg.PNG.dancing8462/image.png?type=w773" data-width="445" data-height="952" alt="" class="se-image-resource egjs-visible">
                              </a>
                          </div>
                  </div>
              </div>
          </div>
          <div class="se-component se-text se-l-default" id="SE-c7d15782-54fd-45b4-aa68-824860ac5def">
              <div class="se-component-content">
                  <div class="se-section se-section-text se-l-default">
                      <div class="se-module se-module-text">
                              <!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-5d021d0d-d5fd-4c56-b397-42bc57b3a91a"><span style="" class="se-fs-fs19 se-ff-   " id="SE-9350e27b-4d2a-11ed-8a7b-611ce42a7188"><b>아이원위크의 세번째 혜택!</b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-eeb51333-282f-455f-adc1-3c9b88a3bc45"><span style="" class="se-fs-fs19 se-ff-   " id="SE-9350e27c-4d2a-11ed-8a7b-1566a4e337de"><b>원플원은 아니지만 베스트한 제품들을 </b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-70ee645c-f60b-4dc0-b215-4d17d870c090"><span style="" class="se-fs-fs19 se-ff-   " id="SE-9350e27d-4d2a-11ed-8a7b-8943c6dd5edd"><b>최대 60%까지 할인을 해요 </b></span><span style="" class="se-fs-fs19 se-ff-   " id="SE-9350e27e-4d2a-11ed-8a7b-9b64e209813f"><b></b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-e11a7b14-46be-4f60-8fb1-44882d3837f7"><span style="" class="se-fs-fs19 se-ff-   " id="SE-9351098f-4d2a-11ed-8a7b-af3ec5445f05"><b></b></span></p><!-- } SE-TEXT -->
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-sticker se-l-default" id="SE-d0892d76-869d-4b2c-92eb-e9028edc31fa">
              <div class="se-component-content">
                  <div class="se-section se-section-sticker se-section-align-center se-l-default">
                      <div class="se-module se-module-sticker">
                          <a href="#" onclick="return false;" class="__se_sticker_link __se_link" data-linktype="sticker" data-linkdata="{&quot;src&quot; : &quot;https://storep-phinf.pstatic.net/ogq_5a7a1f79dc8ab/original_3.png&quot;, &quot;packCode&quot; : &quot;ogq_5a7a1f79dc8ab&quot;, &quot;seq&quot; : &quot;3&quot;, &quot;width&quot; : &quot;185&quot;, &quot;height&quot; : &quot;160&quot;}">
                              <img src="https://storep-phinf.pstatic.net/ogq_5a7a1f79dc8ab/original_3.png?type=p100_100" alt="" class="se-sticker-image egjs-visible">
                          </a>
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-image se-l-default" id="SE-6b1c8624-3b7e-49b2-8151-bb310536ece2">
              <div class="se-component-content se-component-content-normal">
                  <div class="se-section se-section-image se-l-default se-section-align-center" style="max-width:679px;">
                          <div class="se-module se-module-image" style="">
                              <a class="se-module-image-link __se_image_link __se_link" style="" onclick="return false;" data-linktype="img" data-linkdata="{&quot;id&quot; : &quot;SE-6b1c8624-3b7e-49b2-8151-bb310536ece2&quot;, &quot;src&quot; : &quot;https://postfiles.pstatic.net/MjAyMjEwMTZfMTYx/MDAxNjY1OTA0Mzc4MDU5.6eEevzBH3K6bTGLHHGBZeqOa6KSEHClwonfwZEQgzy0g.iT6hNN-r001F6rDP-0aGFlKWo6V65HQbDqFxHbJMklcg.PNG.dancing8462/image.png&quot;, &quot;originalWidth&quot; : &quot;679&quot;, &quot;originalHeight&quot; : &quot;741&quot;, &quot;linkUse&quot; : &quot;false&quot;, &quot;link&quot; : &quot;&quot;}" area-hidden="true">
                                  <img src="https://postfiles.pstatic.net/MjAyMjEwMTZfMTYx/MDAxNjY1OTA0Mzc4MDU5.6eEevzBH3K6bTGLHHGBZeqOa6KSEHClwonfwZEQgzy0g.iT6hNN-r001F6rDP-0aGFlKWo6V65HQbDqFxHbJMklcg.PNG.dancing8462/image.png?type=w80_blur" data-lazy-src="https://postfiles.pstatic.net/MjAyMjEwMTZfMTYx/MDAxNjY1OTA0Mzc4MDU5.6eEevzBH3K6bTGLHHGBZeqOa6KSEHClwonfwZEQgzy0g.iT6hNN-r001F6rDP-0aGFlKWo6V65HQbDqFxHbJMklcg.PNG.dancing8462/image.png?type=w773" data-width="679" data-height="741" alt="" class="se-image-resource egjs-visible">
                              </a>
                          </div>
                  </div>
              </div>
          </div>
          <div class="se-component se-image se-l-default" id="SE-578e0e94-977d-49ab-b6bc-bf01173a8498">
              <div class="se-component-content se-component-content-normal">
                  <div class="se-section se-section-image se-l-default se-section-align-center" style="max-width:686px;">
                          <div class="se-module se-module-image" style="">
                              <a class="se-module-image-link __se_image_link __se_link" style="" onclick="return false;" data-linktype="img" data-linkdata="{&quot;id&quot; : &quot;SE-578e0e94-977d-49ab-b6bc-bf01173a8498&quot;, &quot;src&quot; : &quot;https://postfiles.pstatic.net/MjAyMjEwMTZfMjQy/MDAxNjY1OTA0Mzg0Mjcy.rAn0L34GmGLyw7GaFiBGH_QWUDUdRQdgQkeN6g1a2RAg.5x8DKPQRqrzwOOgwAfCAqtY810Elzjfl7t8VA54iQNkg.PNG.dancing8462/image.png&quot;, &quot;originalWidth&quot; : &quot;686&quot;, &quot;originalHeight&quot; : &quot;280&quot;, &quot;linkUse&quot; : &quot;false&quot;, &quot;link&quot; : &quot;&quot;}" area-hidden="true">
                                  <img src="https://postfiles.pstatic.net/MjAyMjEwMTZfMjQy/MDAxNjY1OTA0Mzg0Mjcy.rAn0L34GmGLyw7GaFiBGH_QWUDUdRQdgQkeN6g1a2RAg.5x8DKPQRqrzwOOgwAfCAqtY810Elzjfl7t8VA54iQNkg.PNG.dancing8462/image.png?type=w80_blur" data-lazy-src="https://postfiles.pstatic.net/MjAyMjEwMTZfMjQy/MDAxNjY1OTA0Mzg0Mjcy.rAn0L34GmGLyw7GaFiBGH_QWUDUdRQdgQkeN6g1a2RAg.5x8DKPQRqrzwOOgwAfCAqtY810Elzjfl7t8VA54iQNkg.PNG.dancing8462/image.png?type=w773" data-width="686" data-height="280" alt="" class="se-image-resource egjs-visible">
                              </a>
                          </div>
                  </div>
              </div>
          </div>
          <div class="se-component se-text se-l-default" id="SE-0f6f5b2c-fac2-46a4-89ee-25a4784f94cf">
              <div class="se-component-content">
                  <div class="se-section se-section-text se-l-default">
                      <div class="se-module se-module-text">
                              <!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-e79ceb82-44f8-41ae-a3af-1abc2bcbd348"><span style="color:#000000;" class="se-fs-fs13 se-ff-   " id="SE-935130a0-4d2a-11ed-8a7b-2d189f3854a7"></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-29e4e3bf-a5ad-4bc9-839c-33292008c812"><span style="color:#000000;" class="se-fs-fs19 se-ff-   " id="SE-935130a1-4d2a-11ed-8a7b-336c49a37a3f"><b>그 외</b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-1a77ac9b-0c64-4029-a758-93cfd9a31c95"><span style="color:#000000;" class="se-fs-fs19 se-ff-   " id="SE-935130a2-4d2a-11ed-8a7b-19b62b550f71"><b>다양한 제품들을 할인하고 있어요</b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-365d80af-f70c-4b76-9990-8015ddd50154"><span style="color:#000000;" class="se-fs-fs19 se-ff-   " id="SE-935130a3-4d2a-11ed-8a7b-8578174a57df"><b>콜라겐 츄는 쫄깃하니  너무너무 맛있더라고요 </b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-e4c5a4e3-5f7b-40b1-a3a0-baf3924c3c9d"><span style="color:#000000;" class="se-fs-fs19 se-ff-   " id="SE-935157b4-4d2a-11ed-8a7b-cf4aaf53f3e9"><b>저 저번에 구매해서 너무 잘 먹고 있어요 </b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-0ee46514-66ac-4685-8dcf-8bc41257d273"><span style="color:#000000;" class="se-fs-fs19 se-ff-   " id="SE-935157b5-4d2a-11ed-8a7b-3d9733266639"><b>피부탱탱 콜라겐 소중해요 ㅠ</b></span></p><!-- } SE-TEXT -->
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-sticker se-l-default" id="SE-5321cbc7-f3a3-4e90-a810-68b54d5f0653">
              <div class="se-component-content">
                  <div class="se-section se-section-sticker se-section-align-center se-l-default">
                      <div class="se-module se-module-sticker">
                          <a href="#" onclick="return false;" class="__se_sticker_link __se_link" data-linktype="sticker" data-linkdata="{&quot;src&quot; : &quot;https://storep-phinf.pstatic.net/ogq_5a7a1f79dc8ab/original_1.png&quot;, &quot;packCode&quot; : &quot;ogq_5a7a1f79dc8ab&quot;, &quot;seq&quot; : &quot;1&quot;, &quot;width&quot; : &quot;185&quot;, &quot;height&quot; : &quot;160&quot;}">
                              <img src="https://storep-phinf.pstatic.net/ogq_5a7a1f79dc8ab/original_1.png?type=p100_100" alt="" class="se-sticker-image egjs-visible">
                          </a>
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-text se-l-default" id="SE-0876cef5-ccea-4429-a0ab-b94ef6e1a0cf">
              <div class="se-component-content">
                  <div class="se-section se-section-text se-l-default">
                      <div class="se-module se-module-text">
                              <!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-d453232c-9131-4452-801a-f97d9b14b14a"><span style="color:#000000;" class="se-fs-fs19 se-ff-   " id="SE-935157b6-4d2a-11ed-8a7b-4b551dac25aa"><b></b></span></p><!-- } SE-TEXT -->
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-image se-l-default" id="SE-e953f44e-2a6b-421b-819b-354d8e3295e2">
              <div class="se-component-content se-component-content-fit">
                  <div class="se-section se-section-image se-l-default se-section-align-center">
                          <div class="se-module se-module-image" style="">
                              <a class="se-module-image-link __se_image_link __se_link" style="" onclick="return false;" data-linktype="img" data-linkdata="{&quot;id&quot; : &quot;SE-e953f44e-2a6b-421b-819b-354d8e3295e2&quot;, &quot;src&quot; : &quot;https://postfiles.pstatic.net/MjAyMjEwMTZfNDEg/MDAxNjY1OTA0ODU3Nzg5.B7lZinCZBt2JIESzNdfQ_xV8cjhJNRbjCXMJ-0o_JSMg.-JPCuyZl3jDuO2qn4paq-vkAyo-I4lrre3YfWLhg6x0g.PNG.dancing8462/image.png&quot;, &quot;originalWidth&quot; : &quot;1018&quot;, &quot;originalHeight&quot; : &quot;720&quot;, &quot;linkUse&quot; : &quot;false&quot;, &quot;link&quot; : &quot;&quot;}" area-hidden="true">
                                  <img src="https://postfiles.pstatic.net/MjAyMjEwMTZfNDEg/MDAxNjY1OTA0ODU3Nzg5.B7lZinCZBt2JIESzNdfQ_xV8cjhJNRbjCXMJ-0o_JSMg.-JPCuyZl3jDuO2qn4paq-vkAyo-I4lrre3YfWLhg6x0g.PNG.dancing8462/image.png?type=w80_blur" data-lazy-src="https://postfiles.pstatic.net/MjAyMjEwMTZfNDEg/MDAxNjY1OTA0ODU3Nzg5.B7lZinCZBt2JIESzNdfQ_xV8cjhJNRbjCXMJ-0o_JSMg.-JPCuyZl3jDuO2qn4paq-vkAyo-I4lrre3YfWLhg6x0g.PNG.dancing8462/image.png?type=w773" data-width="693" data-height="490" alt="" class="se-image-resource egjs-visible">
                              </a>
                          </div>
                  </div>
              </div>
          </div>
          <div class="se-component se-text se-l-default" id="SE-ddbe1364-3f1b-42c0-8c3e-5d0763163f45">
              <div class="se-component-content">
                  <div class="se-section se-section-text se-l-default">
                      <div class="se-module se-module-text">
                              <!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-9d3f110c-264f-47da-9c44-edfd3dafdc2c"><span style="color:#000000;" class="se-fs-fs19 se-ff-   " id="SE-93517ec7-4d2a-11ed-8a7b-2fb8bb41ddf7"><b>혹시 안국건강 신규라묜?</b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c19ae28d-87bb-4889-a8cd-b16b3c31208b"><span style="color:#000000;" class="se-fs-fs19 se-ff-   " id="SE-93517ec8-4d2a-11ed-8a7b-7966b307acfb"><b>첫구매 50%혜택있으니 </b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-8b36a6fc-6fe5-4d74-8cf7-b1b2dd379ff7"><span style="color:#000000;" class="se-fs-fs19 se-ff-   " id="SE-93517ec9-4d2a-11ed-8a7b-3d6b3ae18da8"><b>먼저 구매후 다른거 구매하시는 것이 좋겠죠?</b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-2f4bc8cf-75e7-495f-b23d-ad0d3d75a2e2"><span style="color:#000000;" class="se-fs-fs19 se-ff-   " id="SE-93517eca-4d2a-11ed-8a7b-ebff167a3a21"><b></b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c3b46afb-3537-4553-b991-7f9f2e327e2e"><span style="color:#000000;" class="se-fs-fs19 se-ff-   " id="SE-93517ecb-4d2a-11ed-8a7b-edf9da837a8a"><b>추천인 입력후 가입하시면</b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-500e8ddc-cdab-47b8-9d97-67e87ffce723"><span style="color:#000000;" class="se-fs-fs19 se-ff-   " id="SE-9351a5dc-4d2a-11ed-8a7b-dd7e0198d733"><b>첫구매하면 5천포도 서로에게 넣어줍니다 ^^</b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-99b485d0-8d27-4fa2-ba1e-4e100fcae71c"><span style="color:#000000;" class="se-fs-fs19 se-ff-   " id="SE-9351a5dd-4d2a-11ed-8a7b-fdc73058f240"><b>밍키언니 dancing8461</b></span><span style="color:#000000;" class="se-fs-fs19 se-ff-   " id="SE-9351a5de-4d2a-11ed-8a7b-09937ca814d4"><b></b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-7be4b40c-f79c-4d43-b47a-f67c31b0cbd2"><span style="color:#000000;" class="se-fs-fs19 se-ff-   " id="SE-9351a5df-4d2a-11ed-8a7b-758987dce531"><b></b></span></p><!-- } SE-TEXT -->
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-oglink se-l-large_image __se-component" id="SE-7285efc5-723b-49bb-94a0-c2df6e52f2fc">
              <div class="se-component-content">
                  <div class="se-section se-section-oglink se-l-large_image se-section-align-center">
                      <div class="se-module se-module-oglink">
                          <a href="https://bit.ly/3es6aJv" class="se-oglink-thumbnail" target="_blank">
                              <img src="https://dthumb-phinf.pstatic.net/?src=%22https%3A%2F%2Fwww.shopagh.com%2Fdata%2Fmain%2Fmata_logo.jpg%3Fts%3D1592872763%22&amp;type=ff500_300" class="se-oglink-thumbnail-resource egjs-visible" alt="">
                          </a>
                          <a href="https://bit.ly/3es6aJv" class="se-oglink-info" target="_blank">
                              <div class="se-oglink-info-container">
                                  <strong class="se-oglink-title">안국건강</strong>
                                  <p class="se-oglink-summary">안국건강 공식 쇼핑몰 AGmall</p>
                                  <p class="se-oglink-url">bit.ly</p>
                              </div>
                          </a>
                      </div>
                  </div>
              </div>
              <script type="text/data" class="__se_module_data" data-module="{&quot;type&quot;:&quot;v2_oglink&quot;, &quot;id&quot; :&quot;SE-7285efc5-723b-49bb-94a0-c2df6e52f2fc&quot;, &quot;data&quot; : {&quot;link&quot; : &quot;https://bit.ly/3es6aJv&quot;, &quot;isVideo&quot; : &quot;false&quot;, &quot;thumbnail&quot; : &quot;https://dthumb-phinf.pstatic.net/?src=%22https%3A%2F%2Fwww.shopagh.com%2Fdata%2Fmain%2Fmata_logo.jpg%3Fts%3D1592872763%22&amp;type=ff500_300&quot;}}"></script>
          </div>                <div class="se-component se-text se-l-default" id="SE-bf2617d8-6f69-430c-8f7f-d8c69c3d2f35">
              <div class="se-component-content">
                  <div class="se-section se-section-text se-l-default">
                      <div class="se-module se-module-text">
                              <!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-138ff54e-d73b-4f3a-aed2-8ab812b644d2"><span style="color:#000000;" class="se-fs-fs13 se-ff-   " id="SE-9351ccf0-4d2a-11ed-8a7b-2dd786dd2f19"><a href="https://bit.ly/3es6aJv" class="se-link" target="_blank">https://bit.ly/3es6aJv</a></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-6081f994-e8b2-4afe-b878-8899edf59089"><span style="color:#000000;" class="se-fs-fs19 se-ff-   " id="SE-9351f401-4d2a-11ed-8a7b-adb8bea3ad8d"><b></b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-78e35731-8222-4510-9e61-42b243087392"><span style="color:#000000;" class="se-fs-fs19 se-ff-   " id="SE-9351f402-4d2a-11ed-8a7b-25fe973bbd84"><b>건강챙기시고 </b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-0a415474-20f8-4de5-9d58-ecab756a2945"><span style="color:#000000;" class="se-fs-fs19 se-ff-   " id="SE-9351f403-4d2a-11ed-8a7b-83a0e7ae7e7d"><b>모자란 부분은 안국건강의 영양제 </b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-423cab66-ee7b-499b-91ef-43bd3b27b46c"><span style="color:#000000;" class="se-fs-fs19 se-ff-   " id="SE-9351f404-4d2a-11ed-8a7b-93cf230a3f52"><b>도움도 받으면서 오래오래 삽시다 ^^ ㅎㅎ</b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-b71679b3-3583-4cb9-b9ea-29a0dd261701"><span style="color:#000000;" class="se-fs-fs19 se-ff-   " id="SE-93521b15-4d2a-11ed-8a7b-f7b8e42b26b4"><b>그럼 선물하실분, 필요하신 분은</b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-4e604c14-f959-4b3d-abce-36a24682e2a2"><span style="color:#000000;" class="se-fs-fs19 se-ff-   " id="SE-93521b16-4d2a-11ed-8a7b-b1610c767fc4"><b>안국건강 아이원위크 할인행사 </b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-603efca9-b72d-4d0f-8b7e-133e3025bcde"><span style="color:#000000;" class="se-fs-fs19 se-ff-   " id="SE-93521b17-4d2a-11ed-8a7b-efc34742f63e"><b>둘러보세요</b></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-2249782c-3a4a-4e18-ab18-218aa89094fc"><span style="color:#000000;" class="se-fs-fs19 se-ff-   " id="SE-93521b18-4d2a-11ed-8a7b-19ce1033f12a"><b>안뇽^^</b></span></p><!-- } SE-TEXT -->
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-sticker se-l-default" id="SE-dcb32799-d1d7-4d29-838e-fdbcb1e886bd">
              <div class="se-component-content">
                  <div class="se-section se-section-sticker se-section-align-center se-l-default">
                      <div class="se-module se-module-sticker">
                          <a href="#" onclick="return false;" class="__se_sticker_link __se_link" data-linktype="sticker" data-linkdata="{&quot;src&quot; : &quot;https://storep-phinf.pstatic.net/ogq_5a7a1f79dc8ab/original_12.png&quot;, &quot;packCode&quot; : &quot;ogq_5a7a1f79dc8ab&quot;, &quot;seq&quot; : &quot;12&quot;, &quot;width&quot; : &quot;185&quot;, &quot;height&quot; : &quot;160&quot;}">
                              <img src="https://storep-phinf.pstatic.net/ogq_5a7a1f79dc8ab/original_12.png?type=p100_100" alt="" class="se-sticker-image egjs-visible">
                          </a>
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-text se-l-default" id="SE-c30fdb9e-41ec-4952-b8df-023eefa4e4a7">
              <div class="se-component-content">
                  <div class="se-section se-section-text se-l-default">
                      <div class="se-module se-module-text">
                              <!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-e02b2348-e7c0-4fa2-92fa-01247ef90946"><span style="color:#000000;" class="se-fs-fs19 se-ff-   " id="SE-93524229-4d2a-11ed-8a7b-a3094a3d2959"><b> </b></span></p><!-- } SE-TEXT -->
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-image se-l-default" id="SE-ec01157b-85bb-4bb4-9348-809f34c870d7">
              <div class="se-component-content se-component-content-normal">
                  <div class="se-section se-section-image se-l-default se-section-align-center" style="max-width:546px;">
                          <div class="se-module se-module-image" style="">
                              <a class="se-module-image-link __se_image_link __se_link" style="" onclick="return false;" data-linktype="img" data-linkdata="{&quot;id&quot; : &quot;SE-ec01157b-85bb-4bb4-9348-809f34c870d7&quot;, &quot;src&quot; : &quot;https://postfiles.pstatic.net/MjAyMjEwMTZfMjMz/MDAxNjY1OTA0MjQ3OTUz.q-VJgDv-6UlhGmPR3UC084YTRkfemsuChKC_9Im6EkAg.EDJ6C-5sRXFfxCIZZKGRMKBORfUNTrKud1oceFu7Rjsg.PNG.dancing8462/%EB%B8%94%EB%A1%9C%EA%B7%B8%EC%9B%90%EA%B3%A0%EB%A3%8C.png&quot;, &quot;originalWidth&quot; : &quot;546&quot;, &quot;originalHeight&quot; : &quot;96&quot;, &quot;linkUse&quot; : &quot;false&quot;, &quot;link&quot; : &quot;&quot;}" area-hidden="true">
                                  <img src="https://postfiles.pstatic.net/MjAyMjEwMTZfMjMz/MDAxNjY1OTA0MjQ3OTUz.q-VJgDv-6UlhGmPR3UC084YTRkfemsuChKC_9Im6EkAg.EDJ6C-5sRXFfxCIZZKGRMKBORfUNTrKud1oceFu7Rjsg.PNG.dancing8462/%EB%B8%94%EB%A1%9C%EA%B7%B8%EC%9B%90%EA%B3%A0%EB%A3%8C.png?type=w80_blur" data-lazy-src="https://postfiles.pstatic.net/MjAyMjEwMTZfMjMz/MDAxNjY1OTA0MjQ3OTUz.q-VJgDv-6UlhGmPR3UC084YTRkfemsuChKC_9Im6EkAg.EDJ6C-5sRXFfxCIZZKGRMKBORfUNTrKud1oceFu7Rjsg.PNG.dancing8462/%EB%B8%94%EB%A1%9C%EA%B7%B8%EC%9B%90%EA%B3%A0%EB%A3%8C.png?type=w773" data-width="546" data-height="96" alt="" class="se-image-resource egjs-visible">
                              </a>
                          </div>
                  </div>
              </div>
          </div>
          <div class="se-component se-text se-l-default" id="SE-dbaa0412-9e97-426c-b5e3-4435802c8cd0">
              <div class="se-component-content">
                  <div class="se-section se-section-text se-l-default">
                      <div class="se-module se-module-text">
                              <!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-56c6125f-660b-405a-92c8-79ca5c04a53a"><span style="color:#000000;" class="se-fs-fs13 se-ff-   " id="SE-9352422a-4d2a-11ed-8a7b-3dc5e2270dac"></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="line-height:1.5;" id="SE-ded8f12e-e85f-417f-8389-e79b440b7482"><span style="color:#3b3838;" class="se-fs-fs13 se-ff-   " id="SE-9352422b-4d2a-11ed-8a7b-65fd52b39030"><span class="__se-hash-tag"><a class="tag" href="/PostListByTagName.naver?blogId=dancing8462&amp;encodedTagName=%EC%95%88%EA%B5%AD%EA%B1%B4%EA%B0%95">#안국건강</a></span> <span class="__se-hash-tag"><a class="tag" href="/PostListByTagName.naver?blogId=dancing8462&amp;encodedTagName=%EC%98%81%EC%96%91%EC%A0%9C">#영양제</a></span> <span class="__se-hash-tag"><a class="tag" href="/PostListByTagName.naver?blogId=dancing8462&amp;encodedTagName=%EC%98%81%EC%96%91%EC%A0%9C%EC%84%A0%EB%AC%BC">#영양제선물</a></span> <span class="__se-hash-tag"><a class="tag" href="/PostListByTagName.naver?blogId=dancing8462&amp;encodedTagName=%EC%98%81%EC%96%91%EC%A0%9C%ED%95%A0%EC%9D%B8">#영양제할인</a></span> <span class="__se-hash-tag"><a class="tag" href="/PostListByTagName.naver?blogId=dancing8462&amp;encodedTagName=%EB%A3%A8%ED%85%8C%EC%9D%B8">#루테인</a></span> <span class="__se-hash-tag"><a class="tag" href="/PostListByTagName.naver?blogId=dancing8462&amp;encodedTagName=%EB%A3%A8%ED%85%8C%EC%9D%B8%EC%A7%80%EC%95%84%EC%9E%94%ED%8B%B4">#루테인지아잔틴</a></span> <span class="__se-hash-tag"><a class="tag" href="/PostListByTagName.naver?blogId=dancing8462&amp;encodedTagName=%EB%88%88%EA%B1%B4%EA%B0%95">#눈건강</a></span> <span class="__se-hash-tag"><a class="tag" href="/PostListByTagName.naver?blogId=dancing8462&amp;encodedTagName=%EB%B9%84%ED%83%80%EB%AF%BC">#비타민</a></span> <span class="__se-hash-tag"><a class="tag" href="/PostListByTagName.naver?blogId=dancing8462&amp;encodedTagName=%EC%98%A4%EB%A9%94%EA%B0%803">#오메가3</a></span> <span class="__se-hash-tag"><a class="tag" href="/PostListByTagName.naver?blogId=dancing8462&amp;encodedTagName=%EC%98%A4%EB%A9%94%EA%B0%803%EC%B6%94%EC%B2%9C">#오메가3추천</a></span> <span class="__se-hash-tag"><a class="tag" href="/PostListByTagName.naver?blogId=dancing8462&amp;encodedTagName=%EC%98%A4%EB%A9%94%EA%B0%803%ED%9A%A8%EB%8A%A5">#오메가3효능</a></span></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="line-height:1.5;" id="SE-1542c2d1-fb46-4160-9ba2-52e63c1ba3a0"><span style="color:#3b3838;" class="se-fs-fs13 se-ff-   " id="SE-9352422c-4d2a-11ed-8a7b-ad13e1b63013"><span class="__se-hash-tag"><a class="tag" href="/PostListByTagName.naver?blogId=dancing8462&amp;encodedTagName=%EC%95%88%EA%B5%AD%EA%B1%B4%EA%B0%95%EC%B6%94%EC%B2%9C%EC%9D%B8">#안국건강추천인</a></span> <span class="__se-hash-tag"><a class="tag" href="/PostListByTagName.naver?blogId=dancing8462&amp;encodedTagName=%EC%95%88%EA%B5%AD%EA%B1%B4%EA%B0%95%EC%98%81%EC%96%91%EC%A0%9C">#안국건강영양제</a></span> </span><span style="color:#3b3838;" class="se-fs-fs13 se-ff-   " id="SE-9352422d-4d2a-11ed-8a7b-f93dbe23fe18"></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="line-height:1.5;" id="SE-25886fc6-8b84-4aca-aceb-498eb07db3ae"><span style="color:#3b3838;" class="se-fs-fs13 se-ff-   " id="SE-9352693e-4d2a-11ed-8a7b-450c9c125a94"></span></p><!-- } SE-TEXT -->
                      </div>
                  </div>
              </div>
          </div>    </div>`,
          status: '완료',
          done: true,
          bold: false,
          hidden: false,
        },
      }),
    );

    stores.dispatch(
      eventActions.setEventItem({
        event: {
          id: '4',
          category: 'INCOME',
          name: '13000원 공짜식비절약 이벤트',
          startDate: new Date('2022-10-14'),
          endDate: new Date('2022-10-18'),
          description: `<div class="se-main-container">
          <div class="se-component se-text se-l-default" id="SE-83960b24-4cea-11ed-b28c-cbc7a372832a">
              <div class="se-component-content">
                  <div class="se-section se-section-text se-l-default">
                      <div class="se-module se-module-text">
                              <!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-6389168b-4cea-11ed-b28c-b7cffdbd9695"><span style="" class="se-fs- se-ff-   " id="SE-c87e28eb-4ceb-11ed-b28c-c522b769e0c7">안녕하세요</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c8785c20-4ceb-11ed-b28c-3ffa2547432f"><span style="" class="se-fs- se-ff-   " id="SE-c87e28ec-4ceb-11ed-b28c-595f5179a01d">돈요정 밍키언니입니다</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c8785c22-4ceb-11ed-b28c-e54ebb5d1e85"><span style="" class="se-fs- se-ff-   " id="SE-c87e28ed-4ceb-11ed-b28c-e12ec4146fcb">오늘 새벽 2스시경부터 카톡돼요</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c8785c24-4ceb-11ed-b28c-831e09c6fa64"><span style="" class="se-fs- se-ff-   " id="SE-c87e28ee-4ceb-11ed-b28c-072479681015">사진이나 동영상 전송은 안되니 참고하시고요</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c8785c26-4ceb-11ed-b28c-b736cfbf6899"><span style="" class="se-fs- se-ff-   " id="SE-c87e28ef-4ceb-11ed-b28c-870bad23df4b">카톡펜데믹인듯</span></p><!-- } SE-TEXT -->
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-sticker se-l-default" id="SE-83948483-4cea-11ed-b28c-71bdb693d944">
              <div class="se-component-content">
                  <div class="se-section se-section-sticker se-section-align-center se-l-default">
                      <div class="se-module se-module-sticker">
                          <a href="#" onclick="return false;" class="__se_sticker_link __se_link" data-linktype="sticker" data-linkdata="{&quot;src&quot; : &quot;https://storep-phinf.pstatic.net/ogq_5e9a4dc9c7d62/original_1.png&quot;, &quot;packCode&quot; : &quot;ogq_5e9a4dc9c7d62&quot;, &quot;seq&quot; : &quot;1&quot;, &quot;width&quot; : &quot;370&quot;, &quot;height&quot; : &quot;320&quot;}">
                              <img src="https://storep-phinf.pstatic.net/ogq_5e9a4dc9c7d62/original_1.png?type=p100_100" alt="" class="se-sticker-image egjs-visible">
                          </a>
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-imageStrip se-imageStrip2 se-l-default" id="SE-a496d532-4cea-11ed-b28c-7b0cf3944dd6">
              <div class="se-component-content se-component-content-extend">
                  <div class="se-section se-section-imageStrip se-l-default">
                      <div class="se-imageStrip-container se-imageStrip-col-2">
                          <div class="se-module se-module-image" style="width:43.52479486264716%;">
                              <a class="se-module-image-link __se_image_link __se_link" style="" onclick="return false;" data-linktype="img" data-linkdata="{&quot;id&quot; : &quot;SE-938887d3-4cea-11ed-b28c-991ec6ffeb65&quot;, &quot;src&quot; : &quot;https://postfiles.pstatic.net/MjAyMjEwMTZfMTI1/MDAxNjY1ODgwNTkxODQ1.Re2F5et5788xrGwnBk4AZX892ZKezRCJcsIp5Q9rHycg.0bJWjII1qCVJDvDZtEsIco_7rDMV8lfLXqdIrLDZMscg.JPEG.dancing8462/20221016%EF%BC%BF093143.jpg&quot;, &quot;originalWidth&quot; : &quot;900&quot;, &quot;originalHeight&quot; : &quot;1583&quot;, &quot;linkUse&quot; : &quot;false&quot;, &quot;link&quot; : &quot;&quot;}" area-hidden="true">
                                  <img src="https://postfiles.pstatic.net/MjAyMjEwMTZfMTI1/MDAxNjY1ODgwNTkxODQ1.Re2F5et5788xrGwnBk4AZX892ZKezRCJcsIp5Q9rHycg.0bJWjII1qCVJDvDZtEsIco_7rDMV8lfLXqdIrLDZMscg.JPEG.dancing8462/20221016%EF%BC%BF093143.jpg?type=w773" data-lazy-src="" data-width="900" data-height="1583" alt="" class="se-image-resource egjs-visible">
                              </a>
                          </div>
                          <div class="se-module se-module-image" style="width:56.47520513735284%;">
                              <a class="se-module-image-link __se_image_link __se_link" style="" onclick="return false;" data-linktype="img" data-linkdata="{&quot;id&quot; : &quot;SE-9388aee4-4cea-11ed-b28c-eb13c7a3f781&quot;, &quot;src&quot; : &quot;https://postfiles.pstatic.net/MjAyMjEwMTZfMTYg/MDAxNjY1ODgwNTkxNTYy.cmaUg8L-gA-1O9Rh2lIrsEgOSaWf6dmJABLmTgU4TyAg.p3p37oZmbiQ_MLv0fONvNCtR_FMbjIb6XHauOtp83gog.JPEG.dancing8462/20221016%EF%BC%BF093129.jpg&quot;, &quot;originalWidth&quot; : &quot;900&quot;, &quot;originalHeight&quot; : &quot;1220&quot;, &quot;linkUse&quot; : &quot;false&quot;, &quot;link&quot; : &quot;&quot;}" area-hidden="true">
                                  <img src="https://postfiles.pstatic.net/MjAyMjEwMTZfMTYg/MDAxNjY1ODgwNTkxNTYy.cmaUg8L-gA-1O9Rh2lIrsEgOSaWf6dmJABLmTgU4TyAg.p3p37oZmbiQ_MLv0fONvNCtR_FMbjIb6XHauOtp83gog.JPEG.dancing8462/20221016%EF%BC%BF093129.jpg?type=w773" data-lazy-src="" data-width="900" data-height="1220" alt="" class="se-image-resource egjs-visible">
                              </a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-text se-l-default" id="SE-df936424-4cea-11ed-b28c-933535205337">
              <div class="se-component-content">
                  <div class="se-section se-section-text se-l-default">
                      <div class="se-module se-module-text">
                              <!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c8785c28-4ceb-11ed-b28c-f33002cfbdd4"><span style="" class="se-fs- se-ff-   " id="SE-c87e9e20-4ceb-11ed-b28c-cbe42a92e5a1">HD마켓에서 13000원공짜</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c8785c2a-4ceb-11ed-b28c-2f0e3b413c7c"><span style="" class="se-fs- se-ff-   " id="SE-c87e9e21-4ceb-11ed-b28c-396136c74484"> 식비절약 이벤트가 있어요</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c8785c2c-4ceb-11ed-b28c-9fbc6182389f"><span style="" class="se-fs- se-ff-   " id="SE-c87e9e22-4ceb-11ed-b28c-efa94e70582f"></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c8785c2e-4ceb-11ed-b28c-6b1046023a29"><span style="" class="se-fs- se-ff-   " id="SE-c87e9e23-4ceb-11ed-b28c-4dc1078223ae">1.</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c8785c30-4ceb-11ed-b28c-a73c52717995"><span style="" class="se-fs- se-ff-   " id="SE-c87e9e24-4ceb-11ed-b28c-157ac462b054">친구초대로 가입시 1만포+무배쿠폰</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c8785c32-4ceb-11ed-b28c-d15ead30c674"><span style="" class="se-fs- se-ff-   " id="SE-c87e9e25-4ceb-11ed-b28c-c394daef90c7"></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c8785c34-4ceb-11ed-b28c-03d4107d915e"><span style="" class="se-fs- se-ff-   " id="SE-c87e9e26-4ceb-11ed-b28c-2ff52d3585c1">2.</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c8785c36-4ceb-11ed-b28c-8954c499215a"><span style="" class="se-fs- se-ff-   " id="SE-c87e9e27-4ceb-11ed-b28c-d5677dd4281a">앱로그인시 할인3찬쿠폰</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c8785c38-4ceb-11ed-b28c-957c35a6c20e"><span style="" class="se-fs- se-ff-   " id="SE-c87e9e28-4ceb-11ed-b28c-4bf9886ae75f"></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c878834a-4ceb-11ed-b28c-01a0ec6ccdd3"><span style="" class="se-fs- se-ff-   " id="SE-c87e9e29-4ceb-11ed-b28c-f78040df8023">3.</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c878834c-4ceb-11ed-b28c-0fb69d08d62d"><span style="" class="se-fs- se-ff-   " id="SE-c87e9e2a-4ceb-11ed-b28c-edea4fad1798">첫구매시 서로 1만포적립 </span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c878834e-4ceb-11ed-b28c-35bf40f97dad"><span style="" class="se-fs- se-ff-   " id="SE-c87e9e2b-4ceb-11ed-b28c-1528d0b63901"></span></p><!-- } SE-TEXT -->
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-sticker se-l-default" id="SE-df9279c3-4cea-11ed-b28c-a566a72fd213">
              <div class="se-component-content">
                  <div class="se-section se-section-sticker se-section-align-center se-l-default">
                      <div class="se-module se-module-sticker">
                          <a href="#" onclick="return false;" class="__se_sticker_link __se_link" data-linktype="sticker" data-linkdata="{&quot;src&quot; : &quot;https://storep-phinf.pstatic.net/ogq_5e9a4dc9c7d62/original_3.png&quot;, &quot;packCode&quot; : &quot;ogq_5e9a4dc9c7d62&quot;, &quot;seq&quot; : &quot;3&quot;, &quot;width&quot; : &quot;370&quot;, &quot;height&quot; : &quot;320&quot;}">
                              <img src="https://storep-phinf.pstatic.net/ogq_5e9a4dc9c7d62/original_3.png?type=p100_100" alt="" class="se-sticker-image egjs-visible">
                          </a>
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-text se-l-default" id="SE-df938b41-4cea-11ed-b28c-0ba031d04ec5">
              <div class="se-component-content">
                  <div class="se-section se-section-text se-l-default">
                      <div class="se-module se-module-text">
                              <!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c8788350-4ceb-11ed-b28c-ab4eaaddab23"><span style="" class="se-fs- se-ff-   " id="SE-c87ec53c-4ceb-11ed-b28c-a121bc2ed8cb">간편가입x</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c8788352-4ceb-11ed-b28c-393de1832bef"><span style="" class="se-fs- se-ff-   " id="SE-c87ec53d-4ceb-11ed-b28c-3938fbd0ffa2">밍키언니 아이디 dancing8461 </span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c8788354-4ceb-11ed-b28c-6dc0115628d2"><span style="" class="se-fs- se-ff-   " id="SE-c87ec53e-4ceb-11ed-b28c-8b9360897f04"></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c8788356-4ceb-11ed-b28c-5b81b71612a4"><span style="" class="se-fs- se-ff-   " id="SE-c87ec53f-4ceb-11ed-b28c-59a99d291ec4"></span></p><!-- } SE-TEXT -->
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-image se-l-default" id="SE-938887d2-4cea-11ed-b28c-359cbccde210">
              <div class="se-component-content se-component-content-fit">
                  <div class="se-section se-section-image se-l-default se-section-align-center">
                          <div class="se-module se-module-image" style="">
                              <a class="se-module-image-link __se_image_link __se_link" style="" onclick="return false;" data-linktype="img" data-linkdata="{&quot;id&quot; : &quot;SE-938887d2-4cea-11ed-b28c-359cbccde210&quot;, &quot;src&quot; : &quot;https://postfiles.pstatic.net/MjAyMjEwMTZfMTU3/MDAxNjY1ODgwNTkxNTMz.0KkdseAyeZr9VnrgchaXxnGaVTCZS9V-ab39OiBVx-Eg.npz_K1aa1A-Xu1bOkr5xc4CwrYE1FjzfB3tHKrgnkssg.JPEG.dancing8462/20221016%EF%BC%BF093233.jpg&quot;, &quot;originalWidth&quot; : &quot;900&quot;, &quot;originalHeight&quot; : &quot;480&quot;, &quot;linkUse&quot; : &quot;false&quot;, &quot;link&quot; : &quot;&quot;}" area-hidden="true">
                                  <img src="https://postfiles.pstatic.net/MjAyMjEwMTZfMTU3/MDAxNjY1ODgwNTkxNTMz.0KkdseAyeZr9VnrgchaXxnGaVTCZS9V-ab39OiBVx-Eg.npz_K1aa1A-Xu1bOkr5xc4CwrYE1FjzfB3tHKrgnkssg.JPEG.dancing8462/20221016%EF%BC%BF093233.jpg?type=w80_blur" data-lazy-src="https://postfiles.pstatic.net/MjAyMjEwMTZfMTU3/MDAxNjY1ODgwNTkxNTMz.0KkdseAyeZr9VnrgchaXxnGaVTCZS9V-ab39OiBVx-Eg.npz_K1aa1A-Xu1bOkr5xc4CwrYE1FjzfB3tHKrgnkssg.JPEG.dancing8462/20221016%EF%BC%BF093233.jpg?type=w773" data-width="900" data-height="480" alt="" class="se-image-resource egjs-visible">
                              </a>
                          </div>
                  </div>
              </div>
          </div>
          <div class="se-component se-text se-l-default" id="SE-fbc51a46-4cea-11ed-b28c-29c9a9a45e90">
              <div class="se-component-content">
                  <div class="se-section se-section-text se-l-default">
                      <div class="se-module se-module-text">
                              <!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c8788358-4ceb-11ed-b28c-c7a8c204eb48"><span style="" class="se-fs- se-ff-   " id="SE-c87ec540-4ceb-11ed-b28c-0bb52b645167">요렇게 생긴앱이고요</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c878835a-4ceb-11ed-b28c-f110c0b2704e"><span style="" class="se-fs- se-ff-   " id="SE-c87ec541-4ceb-11ed-b28c-dfc3cfc24f43">가입은 링크로</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c878835c-4ceb-11ed-b28c-5fba870b9548"><span style="" class="se-fs- se-ff-   " id="SE-c87ec542-4ceb-11ed-b28c-b36843ac3443">주문은 앱으로 하세요</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c878835e-4ceb-11ed-b28c-cddad30d2da2"><span style="" class="se-fs- se-ff-   " id="SE-c87ec543-4ceb-11ed-b28c-8f85c38a8735">새벽엔 빨랐는데</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c8788360-4ceb-11ed-b28c-c17392b6d23e"><span style="" class="se-fs- se-ff-   " id="SE-c87ec544-4ceb-11ed-b28c-814208258db1">지금은</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c8788362-4ceb-11ed-b28c-6bb0307d9088"><span style="" class="se-fs- se-ff-   " id="SE-c87ec545-4ceb-11ed-b28c-094329ca296c">마니 느립니다</span></p><!-- } SE-TEXT -->
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-oglink se-l-text __se-component" id="SE-fbc408d5-4cea-11ed-b28c-2b2db33ee776">
              <div class="se-component-content">
                  <div class="se-section se-section-oglink se-l-text se-section-align-center">
                      <div class="se-module se-module-oglink">
                          <a href="https://www.heodakmarket.com" class="se-oglink-info" target="_blank">
                              <div class="se-oglink-info-container">
                                  <strong class="se-oglink-title">HD마켓</strong>
                                  <p class="se-oglink-summary">추천 BEST 임박상품 정기구독 지역맛집 이벤트/기획전 첫구매혜택 선물하기 공동구매 콜라보 타임특가 더보기 [허닭식단] 간편 한끼 컵밥 250g 3종 3팩 16,500원 27% 11,900원 [프레시지] 감바스 알 아히요 14,900원 33% 9,900원 [프레시지] 밀푀유나베 19,900원 30% 13,900원 [허닭식단] 육즙 품은 직화 함박스테이크 2종 혼합 10팩 29,000원 48% 14,900원 SOLD OUT [유통기한임박][프레시지] 스미스푸줏간 토마호크 스테이크세트 41,900원 52% 19,900원 HD마켓 고객센...</p>
                                  <p class="se-oglink-url">www.heodakmarket.com</p>
                              </div>
                          </a>
                      </div>
                  </div>
              </div>
              <script type="text/data" class="__se_module_data" data-module="{&quot;type&quot;:&quot;v2_oglink&quot;, &quot;id&quot; :&quot;SE-fbc408d5-4cea-11ed-b28c-2b2db33ee776&quot;, &quot;data&quot; : {&quot;link&quot; : &quot;https://www.heodakmarket.com&quot;, &quot;isVideo&quot; : &quot;false&quot;, &quot;thumbnail&quot; : &quot;&quot;}}"></script>
          </div>                <div class="se-component se-sticker se-l-default" id="SE-015b75f4-4ceb-11ed-b28c-d759fe56d356">
              <div class="se-component-content">
                  <div class="se-section se-section-sticker se-section-align-center se-l-default">
                      <div class="se-module se-module-sticker">
                          <a href="#" onclick="return false;" class="__se_sticker_link __se_link" data-linktype="sticker" data-linkdata="{&quot;src&quot; : &quot;https://storep-phinf.pstatic.net/ogq_5e9a4dc9c7d62/original_5.png&quot;, &quot;packCode&quot; : &quot;ogq_5e9a4dc9c7d62&quot;, &quot;seq&quot; : &quot;5&quot;, &quot;width&quot; : &quot;370&quot;, &quot;height&quot; : &quot;320&quot;}">
                              <img src="https://storep-phinf.pstatic.net/ogq_5e9a4dc9c7d62/original_5.png?type=p100_100" alt="" class="se-sticker-image egjs-visible">
                          </a>
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-imageStrip se-imageStrip2 se-l-default" id="SE-124b17b9-4ceb-11ed-b28c-bbd541172b5c">
              <div class="se-component-content se-component-content-extend">
                  <div class="se-section se-section-imageStrip se-l-default">
                      <div class="se-imageStrip-container se-imageStrip-col-2">
                          <div class="se-module se-module-image" style="width:62.42127361791462%;">
                              <a class="se-module-image-link __se_image_link __se_link" style="" onclick="return false;" data-linktype="img" data-linkdata="{&quot;id&quot; : &quot;SE-9388d5f5-4cea-11ed-b28c-7bf3b0982ba1&quot;, &quot;src&quot; : &quot;https://postfiles.pstatic.net/MjAyMjEwMTZfMjAz/MDAxNjY1ODgwNTkxNTk4.X-rb18_OH9emslCroI7FCH8a6L0f2jEY_qHbEdanqdwg.uCMt_zYmgRGdwdA7tELu5diaO1QwzejJ0JivQAhHssIg.JPEG.dancing8462/20221016%EF%BC%BF093119.jpg&quot;, &quot;originalWidth&quot; : &quot;900&quot;, &quot;originalHeight&quot; : &quot;1074&quot;, &quot;linkUse&quot; : &quot;false&quot;, &quot;link&quot; : &quot;&quot;}" area-hidden="true">
                                  <img src="https://postfiles.pstatic.net/MjAyMjEwMTZfMjAz/MDAxNjY1ODgwNTkxNTk4.X-rb18_OH9emslCroI7FCH8a6L0f2jEY_qHbEdanqdwg.uCMt_zYmgRGdwdA7tELu5diaO1QwzejJ0JivQAhHssIg.JPEG.dancing8462/20221016%EF%BC%BF093119.jpg?type=w80_blur" data-lazy-src="https://postfiles.pstatic.net/MjAyMjEwMTZfMjAz/MDAxNjY1ODgwNTkxNTk4.X-rb18_OH9emslCroI7FCH8a6L0f2jEY_qHbEdanqdwg.uCMt_zYmgRGdwdA7tELu5diaO1QwzejJ0JivQAhHssIg.JPEG.dancing8462/20221016%EF%BC%BF093119.jpg?type=w773" data-width="900" data-height="1074" alt="" class="se-image-resource egjs-visible">
                              </a>
                          </div>
                          <div class="se-module se-module-image" style="width:37.57872638208537%;">
                              <a class="se-module-image-link __se_image_link __se_link" style="" onclick="return false;" data-linktype="img" data-linkdata="{&quot;id&quot; : &quot;SE-9388d5f6-4cea-11ed-b28c-e77fefb4dc75&quot;, &quot;src&quot; : &quot;https://postfiles.pstatic.net/MjAyMjEwMTZfMjA0/MDAxNjY1ODgwNTkzMTg0.m1QzmIV-jTuoUa0g0GqeaaWuZIcgsNTPGcEqBnunNWog.-GVLNZZ3E8qgxZbu-FyyqwF3-qOu9kX31U-T352d_uAg.JPEG.dancing8462/20221016%EF%BC%BF093034.jpg&quot;, &quot;originalWidth&quot; : &quot;900&quot;, &quot;originalHeight&quot; : &quot;1784&quot;, &quot;linkUse&quot; : &quot;false&quot;, &quot;link&quot; : &quot;&quot;}" area-hidden="true">
                                  <img src="https://postfiles.pstatic.net/MjAyMjEwMTZfMjA0/MDAxNjY1ODgwNTkzMTg0.m1QzmIV-jTuoUa0g0GqeaaWuZIcgsNTPGcEqBnunNWog.-GVLNZZ3E8qgxZbu-FyyqwF3-qOu9kX31U-T352d_uAg.JPEG.dancing8462/20221016%EF%BC%BF093034.jpg?type=w80_blur" data-lazy-src="https://postfiles.pstatic.net/MjAyMjEwMTZfMjA0/MDAxNjY1ODgwNTkzMTg0.m1QzmIV-jTuoUa0g0GqeaaWuZIcgsNTPGcEqBnunNWog.-GVLNZZ3E8qgxZbu-FyyqwF3-qOu9kX31U-T352d_uAg.JPEG.dancing8462/20221016%EF%BC%BF093034.jpg?type=w773" data-width="900" data-height="1784" alt="" class="se-image-resource egjs-visible">
                              </a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-text se-l-default" id="SE-467f59c9-4ceb-11ed-b28c-3f80b11dc154">
              <div class="se-component-content">
                  <div class="se-section se-section-text se-l-default">
                      <div class="se-module se-module-text">
                              <!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c8788364-4ceb-11ed-b28c-5f3a2c830328"><span style="" class="se-fs- se-ff-   " id="SE-c87eec56-4ceb-11ed-b28c-134401d58708"></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c8788366-4ceb-11ed-b28c-7fe648f90fe8"><span style="" class="se-fs- se-ff-   " id="SE-c87eec57-4ceb-11ed-b28c-3dd4290bf404">주의</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c8788368-4ceb-11ed-b28c-85af0a53a670"><span style="" class="se-fs- se-ff-   " id="SE-c87eec58-4ceb-11ed-b28c-954c4db69fdc">1.</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c878836a-4ceb-11ed-b28c-1f9948a95a26"><span style="" class="se-fs- se-ff-   " id="SE-c87eec59-4ceb-11ed-b28c-8fb44e0b1c60">100원딜 주문시에는</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c878836c-4ceb-11ed-b28c-2f47608c1e6b"><span style="" class="se-fs- se-ff-   " id="SE-c87eec5a-4ceb-11ed-b28c-277b69b5997a">적립금 사용안됩니다</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c878836e-4ceb-11ed-b28c-11d6f7f2e5c6"><span style="" class="se-fs- se-ff-   " id="SE-c87eec5b-4ceb-11ed-b28c-4550e2b14080"></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c8788370-4ceb-11ed-b28c-ad0b814dfbea"><span style="" class="se-fs- se-ff-   " id="SE-c87eec5c-4ceb-11ed-b28c-bdd75d76fb65">2.</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c8788372-4ceb-11ed-b28c-917ffc3f163e"><span style="" class="se-fs- se-ff-   " id="SE-c87eec5d-4ceb-11ed-b28c-d38e4b2e6229">1만원이상 주문해야 적립금 써집니다</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c8788374-4ceb-11ed-b28c-69c775f0bcb7"><span style="" class="se-fs- se-ff-   " id="SE-c87eec5e-4ceb-11ed-b28c-23f65a8c9204"></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c8788376-4ceb-11ed-b28c-67a86bdc4397"><span style="" class="se-fs- se-ff-   " id="SE-c87f136f-4ceb-11ed-b28c-956013ee57e6">3.</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c8788378-4ceb-11ed-b28c-85548a1563a0"><span style="" class="se-fs- se-ff-   " id="SE-c87f1370-4ceb-11ed-b28c-cd2688667733">주문시 쿠폰자동적용되어 있는데</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c878d19a-4ceb-11ed-b28c-391e1319ccac"><span style="" class="se-fs- se-ff-   " id="SE-c87f1371-4ceb-11ed-b28c-03f9a2b0ce3b">해지후 적립금 쓰고 다시 쿠폰적용</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c878d19c-4ceb-11ed-b28c-95ba8736e3db"><span style="" class="se-fs- se-ff-   " id="SE-c87f1372-4ceb-11ed-b28c-0b90812718c3"></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c878d19e-4ceb-11ed-b28c-f5f2c4712727"><span style="" class="se-fs- se-ff-   " id="SE-c87f1373-4ceb-11ed-b28c-d1ae939705a4">4.</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c878d1a0-4ceb-11ed-b28c-49c42e1f3a19"><span style="" class="se-fs- se-ff-   " id="SE-c87f1374-4ceb-11ed-b28c-4d64bc13c137">카드결제오류남 </span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c878d1a2-4ceb-11ed-b28c-51f853dbb802"><span style="" class="se-fs- se-ff-   " id="SE-c87f1375-4ceb-11ed-b28c-eb8099bd42b8">무통장으로</span></p><!-- } SE-TEXT -->
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-sticker se-l-default" id="SE-467e9678-4ceb-11ed-b28c-63e08dd92dd7">
              <div class="se-component-content">
                  <div class="se-section se-section-sticker se-section-align-center se-l-default">
                      <div class="se-module se-module-sticker">
                          <a href="#" onclick="return false;" class="__se_sticker_link __se_link" data-linktype="sticker" data-linkdata="{&quot;src&quot; : &quot;https://storep-phinf.pstatic.net/ogq_5e9a4dc9c7d62/original_6.png&quot;, &quot;packCode&quot; : &quot;ogq_5e9a4dc9c7d62&quot;, &quot;seq&quot; : &quot;6&quot;, &quot;width&quot; : &quot;370&quot;, &quot;height&quot; : &quot;320&quot;}">
                              <img src="https://storep-phinf.pstatic.net/ogq_5e9a4dc9c7d62/original_6.png?type=p100_100" alt="" class="se-sticker-image egjs-visible">
                          </a>
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-text se-l-default" id="SE-467f59e2-4ceb-11ed-b28c-3f5ee2e29d5d">
              <div class="se-component-content">
                  <div class="se-section se-section-text se-l-default">
                      <div class="se-module se-module-text">
                              <!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c878d1a4-4ceb-11ed-b28c-e74ae52afa45"><span style="" class="se-fs- se-ff-   " id="SE-c87f1376-4ceb-11ed-b28c-d74f52c992f7"></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c878d1a6-4ceb-11ed-b28c-2d50b12e7c0c"><span style="" class="se-fs- se-ff-   " id="SE-c87f1377-4ceb-11ed-b28c-1f75b9e6a6c1"></span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c878d1a8-4ceb-11ed-b28c-41b47b64df22"><span style="" class="se-fs- se-ff-   " id="SE-c87f1378-4ceb-11ed-b28c-add2a011bae3"></span></p><!-- } SE-TEXT -->
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-imageStrip se-imageStrip2 se-l-default" id="SE-5cfccbc8-4ceb-11ed-b28c-d9657e224961">
              <div class="se-component-content se-component-content-extend">
                  <div class="se-section se-section-imageStrip se-l-default">
                      <div class="se-imageStrip-container se-imageStrip-col-2">
                          <div class="se-module se-module-image" style="width:52.6542800265428%;">
                              <a class="se-module-image-link __se_image_link __se_link" style="" onclick="return false;" data-linktype="img" data-linkdata="{&quot;id&quot; : &quot;SE-9389241b-4cea-11ed-b28c-8d7eeeeb4bc9&quot;, &quot;src&quot; : &quot;https://postfiles.pstatic.net/MjAyMjEwMTZfMjMw/MDAxNjY1ODgwNTk1MTA5.wKOFDm4CS_5bnFqUbl70OMHOrMqvXnclfvXEs4uwJoog.16DeOiPppL9RWP1PwgdKA1HfHRxD5-qkWYqneOIBh3Ig.JPEG.dancing8462/20221016%EF%BC%BF092927.jpg&quot;, &quot;originalWidth&quot; : &quot;900&quot;, &quot;originalHeight&quot; : &quot;1427&quot;, &quot;linkUse&quot; : &quot;false&quot;, &quot;link&quot; : &quot;&quot;}" area-hidden="true">
                                  <img src="https://postfiles.pstatic.net/MjAyMjEwMTZfMjMw/MDAxNjY1ODgwNTk1MTA5.wKOFDm4CS_5bnFqUbl70OMHOrMqvXnclfvXEs4uwJoog.16DeOiPppL9RWP1PwgdKA1HfHRxD5-qkWYqneOIBh3Ig.JPEG.dancing8462/20221016%EF%BC%BF092927.jpg?type=w80_blur" data-lazy-src="https://postfiles.pstatic.net/MjAyMjEwMTZfMjMw/MDAxNjY1ODgwNTk1MTA5.wKOFDm4CS_5bnFqUbl70OMHOrMqvXnclfvXEs4uwJoog.16DeOiPppL9RWP1PwgdKA1HfHRxD5-qkWYqneOIBh3Ig.JPEG.dancing8462/20221016%EF%BC%BF092927.jpg?type=w773" data-width="900" data-height="1427" alt="" class="se-image-resource egjs-visible">
                              </a>
                          </div>
                          <div class="se-module se-module-image" style="width:47.34571997345719%;">
                              <a class="se-module-image-link __se_image_link __se_link" style="" onclick="return false;" data-linktype="img" data-linkdata="{&quot;id&quot; : &quot;SE-9388fd07-4cea-11ed-b28c-75ced2713a2a&quot;, &quot;src&quot; : &quot;https://postfiles.pstatic.net/MjAyMjEwMTZfMTQg/MDAxNjY1ODgwNTkzNzg4.VF2Hk8eALdBPCppQlaqBdyecRZsBPnv-yW94gDFj1pcg.cfANaJy1rKq-U3y2HIDpe0rzh5WdDnNBGoNRFYmqLrwg.JPEG.dancing8462/20221016%EF%BC%BF093013.jpg&quot;, &quot;originalWidth&quot; : &quot;900&quot;, &quot;originalHeight&quot; : &quot;1587&quot;, &quot;linkUse&quot; : &quot;false&quot;, &quot;link&quot; : &quot;&quot;}" area-hidden="true">
                                  <img src="https://postfiles.pstatic.net/MjAyMjEwMTZfMTQg/MDAxNjY1ODgwNTkzNzg4.VF2Hk8eALdBPCppQlaqBdyecRZsBPnv-yW94gDFj1pcg.cfANaJy1rKq-U3y2HIDpe0rzh5WdDnNBGoNRFYmqLrwg.JPEG.dancing8462/20221016%EF%BC%BF093013.jpg?type=w80_blur" data-lazy-src="https://postfiles.pstatic.net/MjAyMjEwMTZfMTQg/MDAxNjY1ODgwNTkzNzg4.VF2Hk8eALdBPCppQlaqBdyecRZsBPnv-yW94gDFj1pcg.cfANaJy1rKq-U3y2HIDpe0rzh5WdDnNBGoNRFYmqLrwg.JPEG.dancing8462/20221016%EF%BC%BF093013.jpg?type=w773" data-width="900" data-height="1587" alt="" class="se-image-resource egjs-visible">
                              </a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-text se-l-default" id="SE-817bc0eb-4ceb-11ed-b28c-ff8fd508b2fd">
              <div class="se-component-content">
                  <div class="se-section se-section-text se-l-default">
                      <div class="se-module se-module-text">
                              <!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c878d1aa-4ceb-11ed-b28c-5956c604feae"><span style="" class="se-fs- se-ff-   " id="SE-c87f1379-4ceb-11ed-b28c-ab31b5b6a89d">요런건 900원</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c878d1ac-4ceb-11ed-b28c-8950c0678f70"><span style="" class="se-fs- se-ff-   " id="SE-c87f137a-4ceb-11ed-b28c-5b36ba415ce1"></span></p><!-- } SE-TEXT -->
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-image se-l-default" id="SE-817446da-4ceb-11ed-b28c-cbe6b95a79b8">
              <div class="se-component-content se-component-content-fit">
                  <div class="se-section se-section-image se-l-default se-section-align-center">
                          <div class="se-module se-module-image" style="">
                              <a class="se-module-image-link __se_image_link __se_link" style="" onclick="return false;" data-linktype="img" data-linkdata="{&quot;id&quot; : &quot;SE-817446da-4ceb-11ed-b28c-cbe6b95a79b8&quot;, &quot;src&quot; : &quot;https://postfiles.pstatic.net/MjAyMjEwMTZfMTI2/MDAxNjY1ODgwOTkwODE5.1GEoyexS5Gfxonr1UMl1cCfYYTTqMhY230RctmcMXLwg.pHaSid5YLgqNn0FzS3GDRo9wKZLGNBs9FG0eakqg8Z8g.JPEG.dancing8462/20221016%EF%BC%BF092946.jpg&quot;, &quot;originalWidth&quot; : &quot;900&quot;, &quot;originalHeight&quot; : &quot;1802&quot;, &quot;linkUse&quot; : &quot;false&quot;, &quot;link&quot; : &quot;&quot;}" area-hidden="true">
                                  <img src="https://postfiles.pstatic.net/MjAyMjEwMTZfMTI2/MDAxNjY1ODgwOTkwODE5.1GEoyexS5Gfxonr1UMl1cCfYYTTqMhY230RctmcMXLwg.pHaSid5YLgqNn0FzS3GDRo9wKZLGNBs9FG0eakqg8Z8g.JPEG.dancing8462/20221016%EF%BC%BF092946.jpg?type=w80_blur" data-lazy-src="https://postfiles.pstatic.net/MjAyMjEwMTZfMTI2/MDAxNjY1ODgwOTkwODE5.1GEoyexS5Gfxonr1UMl1cCfYYTTqMhY230RctmcMXLwg.pHaSid5YLgqNn0FzS3GDRo9wKZLGNBs9FG0eakqg8Z8g.JPEG.dancing8462/20221016%EF%BC%BF092946.jpg?type=w773" data-width="900" data-height="1802" alt="" class="se-image-resource egjs-visible">
                              </a>
                          </div>
                  </div>
              </div>
          </div>
          <div class="se-component se-text se-l-default" id="SE-826d9b56-4ceb-11ed-b28c-03c39a4b544b">
              <div class="se-component-content">
                  <div class="se-section se-section-text se-l-default">
                      <div class="se-module se-module-text">
                              <!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c878d1ae-4ceb-11ed-b28c-bd7c457b0725"><span style="" class="se-fs- se-ff-   " id="SE-c87f137b-4ceb-11ed-b28c-bb16f5cee4c6">부리또 4개 600원</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c878d1b0-4ceb-11ed-b28c-0bfed26ef34f"><span style="" class="se-fs- se-ff-   " id="SE-c87f137c-4ceb-11ed-b28c-77179a707e8c"></span></p><!-- } SE-TEXT -->
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-imageStrip se-imageStrip2 se-l-default" id="SE-92442bc3-4ceb-11ed-b28c-6bf20f2e28fe">
              <div class="se-component-content se-component-content-extend">
                  <div class="se-section se-section-imageStrip se-l-default">
                      <div class="se-imageStrip-container se-imageStrip-col-2">
                          <div class="se-module se-module-image" style="width:49.86025712688653%;">
                              <a class="se-module-image-link __se_image_link __se_link" style="" onclick="return false;" data-linktype="img" data-linkdata="{&quot;id&quot; : &quot;SE-93894b2c-4cea-11ed-b28c-37b31c54c1a9&quot;, &quot;src&quot; : &quot;https://postfiles.pstatic.net/MjAyMjEwMTZfOTQg/MDAxNjY1ODgwNTk1MzMz.sl8WU3pnE3stYDdyqIIapL0NKwEjryX10WOlJDnbk9Eg.2XbBdMtkBb-H-E9aOz2uUZ6FxkiPrYVNKDWk2bNtAj0g.JPEG.dancing8462/20221016%EF%BC%BF092903.jpg&quot;, &quot;originalWidth&quot; : &quot;900&quot;, &quot;originalHeight&quot; : &quot;1794&quot;, &quot;linkUse&quot; : &quot;false&quot;, &quot;link&quot; : &quot;&quot;}" area-hidden="true">
                                  <img src="https://postfiles.pstatic.net/MjAyMjEwMTZfOTQg/MDAxNjY1ODgwNTk1MzMz.sl8WU3pnE3stYDdyqIIapL0NKwEjryX10WOlJDnbk9Eg.2XbBdMtkBb-H-E9aOz2uUZ6FxkiPrYVNKDWk2bNtAj0g.JPEG.dancing8462/20221016%EF%BC%BF092903.jpg?type=w80_blur" data-lazy-src="https://postfiles.pstatic.net/MjAyMjEwMTZfOTQg/MDAxNjY1ODgwNTk1MzMz.sl8WU3pnE3stYDdyqIIapL0NKwEjryX10WOlJDnbk9Eg.2XbBdMtkBb-H-E9aOz2uUZ6FxkiPrYVNKDWk2bNtAj0g.JPEG.dancing8462/20221016%EF%BC%BF092903.jpg?type=w773" data-width="900" data-height="1794" alt="" class="se-image-resource egjs-visible">
                              </a>
                          </div>
                          <div class="se-module se-module-image" style="width:50.13974287311348%;">
                              <a class="se-module-image-link __se_image_link __se_link" style="" onclick="return false;" data-linktype="img" data-linkdata="{&quot;id&quot; : &quot;SE-9389241a-4cea-11ed-b28c-a515b4e4d641&quot;, &quot;src&quot; : &quot;https://postfiles.pstatic.net/MjAyMjEwMTZfNDkg/MDAxNjY1ODgwNTk0NzE4.ino8A1ACga1NS_uStJFWAEYh_J3T5QOIBOrqZFBiKaAg.RzwdhriCfoQFPrQrgknsc4r7WZ6TBnqeF7UT3iYAy9Eg.JPEG.dancing8462/20221016%EF%BC%BF092917.jpg&quot;, &quot;originalWidth&quot; : &quot;900&quot;, &quot;originalHeight&quot; : &quot;1784&quot;, &quot;linkUse&quot; : &quot;false&quot;, &quot;link&quot; : &quot;&quot;}" area-hidden="true">
                                  <img src="https://postfiles.pstatic.net/MjAyMjEwMTZfNDkg/MDAxNjY1ODgwNTk0NzE4.ino8A1ACga1NS_uStJFWAEYh_J3T5QOIBOrqZFBiKaAg.RzwdhriCfoQFPrQrgknsc4r7WZ6TBnqeF7UT3iYAy9Eg.JPEG.dancing8462/20221016%EF%BC%BF092917.jpg?type=w80_blur" data-lazy-src="https://postfiles.pstatic.net/MjAyMjEwMTZfNDkg/MDAxNjY1ODgwNTk0NzE4.ino8A1ACga1NS_uStJFWAEYh_J3T5QOIBOrqZFBiKaAg.RzwdhriCfoQFPrQrgknsc4r7WZ6TBnqeF7UT3iYAy9Eg.JPEG.dancing8462/20221016%EF%BC%BF092917.jpg?type=w773" data-width="900" data-height="1784" alt="" class="se-image-resource egjs-visible">
                              </a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-text se-l-default" id="SE-ade2545c-4ceb-11ed-b28c-1bcc5ddf2cd1">
              <div class="se-component-content">
                  <div class="se-section se-section-text se-l-default">
                      <div class="se-module se-module-text">
                              <!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c878d1b2-4ceb-11ed-b28c-859696413570"><span style="" class="se-fs- se-ff-   " id="SE-c87f137d-4ceb-11ed-b28c-c58aefb46224">요렇게 조합함 0원</span></p><!-- } SE-TEXT -->
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-sticker se-l-default" id="SE-ade1df2b-4ceb-11ed-b28c-8d726f4793f6">
              <div class="se-component-content">
                  <div class="se-section se-section-sticker se-section-align-center se-l-default">
                      <div class="se-module se-module-sticker">
                          <a href="#" onclick="return false;" class="__se_sticker_link __se_link" data-linktype="sticker" data-linkdata="{&quot;src&quot; : &quot;https://storep-phinf.pstatic.net/ogq_5e9a4dc9c7d62/original_8.png&quot;, &quot;packCode&quot; : &quot;ogq_5e9a4dc9c7d62&quot;, &quot;seq&quot; : &quot;8&quot;, &quot;width&quot; : &quot;370&quot;, &quot;height&quot; : &quot;320&quot;}">
                              <img src="https://storep-phinf.pstatic.net/ogq_5e9a4dc9c7d62/original_8.png?type=p100_100" alt="" class="se-sticker-image egjs-visible">
                          </a>
                      </div>
                  </div>
              </div>
          </div>                <div class="se-component se-text se-l-default" id="SE-ae28ac2f-4ceb-11ed-b28c-51bf1bce325a">
              <div class="se-component-content">
                  <div class="se-section se-section-text se-l-default">
                      <div class="se-module se-module-text">
                              <!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c878d1b4-4ceb-11ed-b28c-094825845595"><span style="" class="se-fs- se-ff-   " id="SE-c87f3a8e-4ceb-11ed-b28c-9f40bf9e62c2">그럼 속터지니</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c878d1b6-4ceb-11ed-b28c-75704b4c8cb3"><span style="" class="se-fs- se-ff-   " id="SE-c87f3a8f-4ceb-11ed-b28c-55bef8f4b48b">감당하실수 있는분만 하세요</span></p><!-- } SE-TEXT --><!-- SE-TEXT { --><p class="se-text-paragraph se-text-paragraph-align-center " style="" id="SE-c878d1b8-4ceb-11ed-b28c-91bfe9ad85fb"><span style="" class="se-fs- se-ff-   " id="SE-c87f3a90-4ceb-11ed-b28c-cbf446050da1">안뇽</span></p><!-- } SE-TEXT -->
                      </div>
                  </div>
              </div>
          </div>    </div>`,
          status: '완료',
          done: true,
          bold: false,
          hidden: false,
        },
      }),
    );
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/naver_login" element={<NaverLogin />} />
        </Routes>
      </BrowserRouter>
      <ModalContainer />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
      />
    </>
  );
}

export default App;
