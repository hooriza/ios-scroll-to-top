# scroll-to-top
iOS 에서 -webkit-overflow-scrolling:touch 를 쓸 때, 상단 statusbar 를 누르면 맨 위로 스크롤 되는 기능을 구현한다.
statusbar 을 눌렀을 때 맨 위로 스크롤 되는 기능은 iOS 에서만 동작한다.

## 사용방법

### 필요한 스크립트 파일 추가

	<script src="jquery.js"></script><!-- 또는 zepto.js -->
	<script src="/path/to/scroll-to-top.js"></script>

### scrollable 클래스 지정
-webkit-overflow-scrolling 기능을 쓰고자 하는 엘리먼트에는 scrollable 클래스 지정

	<div class="scrollable">내용</div>
  
### scroll-to-top 클래스 지정
그중에서 상단 statusbar 을 눌렀을때 맨 위로 스크롤 되게 하고 싶은 엘리먼트에는 scroll-to-top 클래스을 추가로 지정 (iOS 에서만 유효함)

	<div class="scrollable scroll-to-top">내용</div>
