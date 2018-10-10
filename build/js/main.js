function initVideo(e,i){if(Hls.isSupported()){var o=new Hls;o.loadSource(i),o.attachMedia(e),o.on(Hls.Events.MANIFEST_PARSED,function(){e.play()})}else e.canPlayType("application/vnd.apple.mpegurl")&&(e.src="https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8",e.addEventListener("loadedmetadata",function(){e.play()}))}function videoCssAnimation(){$(".video__item-1").click(function(){$(".video__item-1").addClass("h-45 w-100"),$(".video__item-2").addClass("h-45 w-0 o-0"),$(".video__item-3").addClass("h-0 o-0"),$(".video__item-4").addClass("h-0 o-0"),$(".video__controls").addClass("o-1"),videoNum=1}),$(".video__item-2").click(function(){$(".video__item-1").addClass("h-45 w-0 o-0"),$(".video__item-2").addClass("h-45 w-100"),$(".video__item-3").addClass("h-0 o-0"),$(".video__item-4").addClass("h-0 o-0"),$(".video__controls").addClass("o-1"),videoNum=2}),$(".video__item-3").click(function(){$(".video__item-1").addClass("h-0 o-0"),$(".video__item-2").addClass("h-0 o-0"),$(".video__item-3").addClass("w-100 h-45"),$(".video__item-4").addClass("w-0 h-45 o-0"),$(".video__controls").addClass("o-1"),videoNum=3}),$(".video__item-4").click(function(){$(".video__item-1").addClass("h-0 o-0"),$(".video__item-2").addClass("h-0 o-0"),$(".video__item-3").addClass("w-0 h-45 o-0"),$(".video__item-4").addClass("w-100 h-45"),$(".video__controls").addClass("o-1"),videoNum=4}),$(".video__button").click(function(){$(".video__item-1").removeClass("h-0 w-0 o-0 h-45 w-100"),$(".video__item-2").removeClass("h-0 w-0 o-0 h-45 w-100"),$(".video__item-3").removeClass("h-0 w-0 o-0 h-45 w-100"),$(".video__item-4").removeClass("h-0 w-0 o-0 h-45 w-100"),$(".video__controls").removeClass("o-1"),videoNum=null})}function changeContrast(e){if(videoNum){var i="contrast("+e/100+")";$(".video__item-"+videoNum).css("filter",i)}}function changeBrightness(e){if(videoNum){var i="brightness("+e/100+")";$(".video__item-"+videoNum).css("filter",i)}}var videoNum;initVideo(document.getElementById("video-1"),"https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"),initVideo(document.getElementById("video-2"),"https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"),initVideo(document.getElementById("video-3"),"http://184.72.239.149/vod/smil:BigBuckBunny.smil/playlist.m3u8"),initVideo(document.getElementById("video-4"),"http://www.streambox.fr/playlists/test_001/stream.m3u8"),450<$(document).width()&&videoCssAnimation(),$(window).resize(function(){450<$(document).width()&&videoCssAnimation()});
function cutSongName(n){if($(window).width()<450){var t=n;23<t.length&&(t=t.substring(0,23),t+="..."),$(".player__song").text(t)}}$(document).ready(function(){var n=$(".player__song").text();cutSongName(n),$(window).resize(function(){cutSongName(n)})});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZGVvL3ZpZGVvLmpzIiwibWFpbi9jYXJkL3BsYXllci9wbGF5ZXIuanMiXSwibmFtZXMiOlsiaW5pdFZpZGVvIiwidmlkZW8iLCJ1cmwiLCJIbHMiLCJpc1N1cHBvcnRlZCIsImhscyIsImxvYWRTb3VyY2UiLCJhdHRhY2hNZWRpYSIsIm9uIiwiRXZlbnRzIiwiTUFOSUZFU1RfUEFSU0VEIiwicGxheSIsImNhblBsYXlUeXBlIiwic3JjIiwiYWRkRXZlbnRMaXN0ZW5lciIsInZpZGVvQ3NzQW5pbWF0aW9uIiwiJCIsImNsaWNrIiwiYWRkQ2xhc3MiLCJ2aWRlb051bSIsInJlbW92ZUNsYXNzIiwiY2hhbmdlQ29udHJhc3QiLCJ2YWwiLCJjc3NDb250cmFjdCIsImNzcyIsImNoYW5nZUJyaWdodG5lc3MiLCJjc3NCcmlnaHRuZXNzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIndpZHRoIiwid2luZG93IiwicmVzaXplIiwiY3V0U29uZ05hbWUiLCJzb25nTmFtZSIsImEiLCJsZW5ndGgiLCJzdWJzdHJpbmciLCJ0ZXh0IiwicmVhZHkiLCJmaXJzdFNvbmdOYW1lIl0sIm1hcHBpbmdzIjoiQUFDQSxTQUFTQSxVQUFVQyxFQUFPQyxHQUN0QixHQUFJQyxJQUFJQyxjQUFlLENBQ25CLElBQUlDLEVBQU0sSUFBSUYsSUFDZEUsRUFBSUMsV0FBV0osR0FDZkcsRUFBSUUsWUFBWU4sR0FDaEJJLEVBQUlHLEdBQUdMLElBQUlNLE9BQU9DLGdCQUFpQixXQUMvQlQsRUFBTVUsY0FFSFYsRUFBTVcsWUFBWSxtQ0FDekJYLEVBQU1ZLElBQU0sMkRBQ1paLEVBQU1hLGlCQUFpQixpQkFBa0IsV0FDckNiLEVBQU1VLFVBSWxCLFNBQVNJLG9CQUNMQyxFQUFFLGtCQUFrQkMsTUFBTSxXQUN0QkQsRUFBRSxrQkFBa0JFLFNBQVMsY0FDN0JGLEVBQUUsa0JBQWtCRSxTQUFTLGdCQUM3QkYsRUFBRSxrQkFBa0JFLFNBQVMsV0FDN0JGLEVBQUUsa0JBQWtCRSxTQUFTLFdBQzdCRixFQUFFLG9CQUFvQkUsU0FBUyxPQUMvQkMsU0FBVyxJQUVmSCxFQUFFLGtCQUFrQkMsTUFBTSxXQUN0QkQsRUFBRSxrQkFBa0JFLFNBQVMsZ0JBQzdCRixFQUFFLGtCQUFrQkUsU0FBUyxjQUM3QkYsRUFBRSxrQkFBa0JFLFNBQVMsV0FDN0JGLEVBQUUsa0JBQWtCRSxTQUFTLFdBQzdCRixFQUFFLG9CQUFvQkUsU0FBUyxPQUMvQkMsU0FBVyxJQUVmSCxFQUFFLGtCQUFrQkMsTUFBTSxXQUN0QkQsRUFBRSxrQkFBa0JFLFNBQVMsV0FDN0JGLEVBQUUsa0JBQWtCRSxTQUFTLFdBQzdCRixFQUFFLGtCQUFrQkUsU0FBUyxjQUM3QkYsRUFBRSxrQkFBa0JFLFNBQVMsZ0JBQzdCRixFQUFFLG9CQUFvQkUsU0FBUyxPQUMvQkMsU0FBVyxJQUdmSCxFQUFFLGtCQUFrQkMsTUFBTSxXQUN0QkQsRUFBRSxrQkFBa0JFLFNBQVMsV0FDN0JGLEVBQUUsa0JBQWtCRSxTQUFTLFdBQzdCRixFQUFFLGtCQUFrQkUsU0FBUyxnQkFDN0JGLEVBQUUsa0JBQWtCRSxTQUFTLGNBQzdCRixFQUFFLG9CQUFvQkUsU0FBUyxPQUMvQkMsU0FBVyxJQUlmSCxFQUFFLGtCQUFrQkMsTUFBTSxXQUN0QkQsRUFBRSxrQkFBa0JJLFlBQVksMEJBQ2hDSixFQUFFLGtCQUFrQkksWUFBWSwwQkFDaENKLEVBQUUsa0JBQWtCSSxZQUFZLDBCQUNoQ0osRUFBRSxrQkFBa0JJLFlBQVksMEJBQ2hDSixFQUFFLG9CQUFvQkksWUFBWSxPQUNsQ0QsU0FBVyxPQUduQixTQUFTRSxlQUFlQyxHQUNwQixHQUFHSCxTQUFTLENBQ1IsSUFDSUksRUFBWSxZQUFZRCxFQUFJLElBQUksSUFDcENOLEVBRm9CLGdCQUFnQkcsVUFFbkJLLElBQUksU0FBU0QsSUFHdEMsU0FBU0UsaUJBQWlCSCxHQUN0QixHQUFHSCxTQUFTLENBQ1IsSUFDSU8sRUFBYyxjQUFjSixFQUFJLElBQUksSUFDeENOLEVBRm9CLGdCQUFnQkcsVUFFbkJLLElBQUksU0FBU0UsSUFvQnRDLElBQUlQLFNBakJKbkIsVUFDSTJCLFNBQVNDLGVBQWUsV0FDeEIsMkdBRUo1QixVQUNJMkIsU0FBU0MsZUFBZSxXQUN4QixtRUFFSjVCLFVBQ0kyQixTQUFTQyxlQUFlLFdBQ3hCLGtFQUVKNUIsVUFDSTJCLFNBQVNDLGVBQWUsV0FDeEIsMERBSW1CLElBQXBCWixFQUFFVyxVQUFVRSxTQUNYZCxvQkFHSkMsRUFBR2MsUUFBU0MsT0FBTyxXQUNNLElBQXBCZixFQUFFVyxVQUFVRSxTQUNYZDtBQ3pGTixTQUFTaUIsWUFBWUMsR0FDakIsR0FBSWpCLEVBQUVjLFFBQVFELFFBQVUsSUFBSyxDQUN6QixJQUFJSyxFQUFJRCxFQUNPLEdBQVhDLEVBQUVDLFNBQ0ZELEVBQUlBLEVBQUVFLFVBQVUsRUFBRyxJQUNuQkYsR0FBSyxPQUVUbEIsRUFBRSxpQkFBaUJxQixLQUFLSCxJQWpCaENsQixFQUFFVyxVQUFVVyxNQUFNLFdBRWQsSUFBSUMsRUFBZ0J2QixFQUFFLGlCQUFpQnFCLE9BQ3ZDTCxZQUFZTyxHQUNadkIsRUFBR2MsUUFBU0MsT0FBTyxXQUNmQyxZQUFZTyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9WaWRlbyBmcm9tIGh0dHBzOi8vYml0bW92aW4uY29tL21wZWctZGFzaC1obHMtZXhhbXBsZXMtc2FtcGxlLXN0cmVhbXMvXHJcbmZ1bmN0aW9uIGluaXRWaWRlbyh2aWRlbywgdXJsKSB7XHJcbiAgICBpZiAoSGxzLmlzU3VwcG9ydGVkKCkpIHtcclxuICAgICAgICB2YXIgaGxzID0gbmV3IEhscygpO1xyXG4gICAgICAgIGhscy5sb2FkU291cmNlKHVybCk7XHJcbiAgICAgICAgaGxzLmF0dGFjaE1lZGlhKHZpZGVvKTtcclxuICAgICAgICBobHMub24oSGxzLkV2ZW50cy5NQU5JRkVTVF9QQVJTRUQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmlkZW8ucGxheSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIGlmICh2aWRlby5jYW5QbGF5VHlwZSgnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnKSkge1xyXG4gICAgICAgIHZpZGVvLnNyYyA9ICdodHRwczovL3ZpZGVvLWRldi5naXRodWIuaW8vc3RyZWFtcy94MzZ4aHp6L3gzNnhoenoubTN1OCc7XHJcbiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkbWV0YWRhdGEnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZpZGVvLnBsYXkoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiB2aWRlb0Nzc0FuaW1hdGlvbigpe1xyXG4gICAgJCgnLnZpZGVvX19pdGVtLTEnKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICQoJy52aWRlb19faXRlbS0xJykuYWRkQ2xhc3MoJ2gtNDUgdy0xMDAnKTtcclxuICAgICAgICAkKCcudmlkZW9fX2l0ZW0tMicpLmFkZENsYXNzKCdoLTQ1IHctMCBvLTAnICk7XHJcbiAgICAgICAgJCgnLnZpZGVvX19pdGVtLTMnKS5hZGRDbGFzcygnaC0wIG8tMCcpO1xyXG4gICAgICAgICQoJy52aWRlb19faXRlbS00JykuYWRkQ2xhc3MoJ2gtMCBvLTAnKTtcclxuICAgICAgICAkKCcudmlkZW9fX2NvbnRyb2xzJykuYWRkQ2xhc3MoJ28tMScpO1xyXG4gICAgICAgIHZpZGVvTnVtID0gMTtcclxuICAgIH0pO1xyXG4gICAgJCgnLnZpZGVvX19pdGVtLTInKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICQoJy52aWRlb19faXRlbS0xJykuYWRkQ2xhc3MoJ2gtNDUgdy0wIG8tMCcgKTtcclxuICAgICAgICAkKCcudmlkZW9fX2l0ZW0tMicpLmFkZENsYXNzKCdoLTQ1IHctMTAwJyk7XHJcbiAgICAgICAgJCgnLnZpZGVvX19pdGVtLTMnKS5hZGRDbGFzcygnaC0wIG8tMCcpO1xyXG4gICAgICAgICQoJy52aWRlb19faXRlbS00JykuYWRkQ2xhc3MoJ2gtMCBvLTAnKTtcclxuICAgICAgICAkKCcudmlkZW9fX2NvbnRyb2xzJykuYWRkQ2xhc3MoJ28tMScpO1xyXG4gICAgICAgIHZpZGVvTnVtID0gMjtcclxuICAgIH0pO1xyXG4gICAgJCgnLnZpZGVvX19pdGVtLTMnKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICQoJy52aWRlb19faXRlbS0xJykuYWRkQ2xhc3MoJ2gtMCBvLTAnKTtcclxuICAgICAgICAkKCcudmlkZW9fX2l0ZW0tMicpLmFkZENsYXNzKCdoLTAgby0wJyApO1xyXG4gICAgICAgICQoJy52aWRlb19faXRlbS0zJykuYWRkQ2xhc3MoJ3ctMTAwIGgtNDUnKTtcclxuICAgICAgICAkKCcudmlkZW9fX2l0ZW0tNCcpLmFkZENsYXNzKCd3LTAgaC00NSBvLTAnKTtcclxuICAgICAgICAkKCcudmlkZW9fX2NvbnRyb2xzJykuYWRkQ2xhc3MoJ28tMScpO1xyXG4gICAgICAgIHZpZGVvTnVtID0gMztcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy52aWRlb19faXRlbS00JykuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAkKCcudmlkZW9fX2l0ZW0tMScpLmFkZENsYXNzKCdoLTAgby0wJyk7XHJcbiAgICAgICAgJCgnLnZpZGVvX19pdGVtLTInKS5hZGRDbGFzcygnaC0wIG8tMCcgKTtcclxuICAgICAgICAkKCcudmlkZW9fX2l0ZW0tMycpLmFkZENsYXNzKCd3LTAgaC00NSBvLTAnKTtcclxuICAgICAgICAkKCcudmlkZW9fX2l0ZW0tNCcpLmFkZENsYXNzKCd3LTEwMCBoLTQ1Jyk7XHJcbiAgICAgICAgJCgnLnZpZGVvX19jb250cm9scycpLmFkZENsYXNzKCdvLTEnKTtcclxuICAgICAgICB2aWRlb051bSA9IDQ7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL3Nob3cgYWxsIHZpZGVvcyBhbmltYXRpb25cclxuICAgICQoJy52aWRlb19fYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAkKCcudmlkZW9fX2l0ZW0tMScpLnJlbW92ZUNsYXNzKCdoLTAgdy0wIG8tMCBoLTQ1IHctMTAwJyk7XHJcbiAgICAgICAgJCgnLnZpZGVvX19pdGVtLTInKS5yZW1vdmVDbGFzcygnaC0wIHctMCBvLTAgaC00NSB3LTEwMCcpO1xyXG4gICAgICAgICQoJy52aWRlb19faXRlbS0zJykucmVtb3ZlQ2xhc3MoJ2gtMCB3LTAgby0wIGgtNDUgdy0xMDAnKTtcclxuICAgICAgICAkKCcudmlkZW9fX2l0ZW0tNCcpLnJlbW92ZUNsYXNzKCdoLTAgdy0wIG8tMCBoLTQ1IHctMTAwJyk7XHJcbiAgICAgICAgJCgnLnZpZGVvX19jb250cm9scycpLnJlbW92ZUNsYXNzKCdvLTEnKTtcclxuICAgICAgICB2aWRlb051bSA9IG51bGw7XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBjaGFuZ2VDb250cmFzdCh2YWwpe1xyXG4gICAgaWYodmlkZW9OdW0pe1xyXG4gICAgICAgIHZhciBpdGVtQ2xhc3NOYW1lID0gJy52aWRlb19faXRlbS0nK3ZpZGVvTnVtO1xyXG4gICAgICAgIHZhciBjc3NDb250cmFjdD0nY29udHJhc3QoJyt2YWwvMTAwKycpJztcclxuICAgICAgICAkKGl0ZW1DbGFzc05hbWUpLmNzcygnZmlsdGVyJyxjc3NDb250cmFjdCk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gY2hhbmdlQnJpZ2h0bmVzcyh2YWwpe1xyXG4gICAgaWYodmlkZW9OdW0pe1xyXG4gICAgICAgIHZhciBpdGVtQ2xhc3NOYW1lID0gJy52aWRlb19faXRlbS0nK3ZpZGVvTnVtO1xyXG4gICAgICAgIHZhciBjc3NCcmlnaHRuZXNzPSdicmlnaHRuZXNzKCcrdmFsLzEwMCsnKSc7XHJcbiAgICAgICAgJChpdGVtQ2xhc3NOYW1lKS5jc3MoJ2ZpbHRlcicsY3NzQnJpZ2h0bmVzcyk7XHJcbiAgICB9XHJcbn1cclxuaW5pdFZpZGVvKFxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvLTEnKSxcclxuICAgICdodHRwczovL2JpdGRhc2gtYS5ha2FtYWloZC5uZXQvY29udGVudC9NSTIwMTEwOTIxMDA4NF8xL20zdThzL2YwOGU4MGRhLWJmMWQtNGUzZC04ODk5LWYwZjYxNTVmNmVmYS5tM3U4J1xyXG4pO1xyXG5pbml0VmlkZW8oXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlkZW8tMicpLFxyXG4gICAgJ2h0dHBzOi8vYml0ZGFzaC1hLmFrYW1haWhkLm5ldC9jb250ZW50L3NpbnRlbC9obHMvcGxheWxpc3QubTN1OCdcclxuKTtcclxuaW5pdFZpZGVvKFxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvLTMnKSxcclxuICAgICdodHRwOi8vMTg0LjcyLjIzOS4xNDkvdm9kL3NtaWw6QmlnQnVja0J1bm55LnNtaWwvcGxheWxpc3QubTN1OCdcclxuKTtcclxuaW5pdFZpZGVvKFxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvLTQnKSxcclxuICAgICdodHRwOi8vd3d3LnN0cmVhbWJveC5mci9wbGF5bGlzdHMvdGVzdF8wMDEvc3RyZWFtLm0zdTgnXHJcbik7XHJcblxyXG52YXIgdmlkZW9OdW07XHJcbmlmKCQoZG9jdW1lbnQpLndpZHRoKCk+NDUwKSB7XHJcbiAgICB2aWRlb0Nzc0FuaW1hdGlvbigpO1xyXG59XHJcblxyXG4kKCB3aW5kb3cgKS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgaWYoJChkb2N1bWVudCkud2lkdGgoKT40NTApe1xyXG4gICAgICB2aWRlb0Nzc0FuaW1hdGlvbigpO1xyXG4gIH1cclxufSk7IiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIGZpcnN0U29uZ05hbWUgPSAkKCcucGxheWVyX19zb25nJykudGV4dCgpO1xyXG4gICAgY3V0U29uZ05hbWUoZmlyc3RTb25nTmFtZSk7XHJcbiAgICAkKCB3aW5kb3cgKS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY3V0U29uZ05hbWUoZmlyc3RTb25nTmFtZSk7XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5cclxuZnVuY3Rpb24gY3V0U29uZ05hbWUoc29uZ05hbWUpe1xyXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpIDwgNDUwKSB7XHJcbiAgICAgICAgdmFyIGEgPSBzb25nTmFtZTtcclxuICAgICAgICBpZiAoYS5sZW5ndGggPiAyMykge1xyXG4gICAgICAgICAgICBhID0gYS5zdWJzdHJpbmcoMCwgMjMpO1xyXG4gICAgICAgICAgICBhICs9IFwiLi4uXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoJy5wbGF5ZXJfX3NvbmcnKS50ZXh0KGEpO1xyXG4gICAgfVxyXG59Il19
