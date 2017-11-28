// ボタンクリックで詳細表示
$(function(){
    var service_list = $('#service_list_table');
    var border_wh = service_list.find('table');
    service_list.css('opacity','0');
    var cl_cnt = 0;
    var loop_cnt,$table_height;
    // モバイルかそれ以外か判別
    if ($(window).width() < 768) {
        // mobile
        loop_cnt = 14;
        $table_height = $('#sv_list_table_1').height()+20;
    } else {
        // without mobile
        loop_cnt = 7;
        $table_height = $('#sv_list_table_2').height()+20;
    }
    $('.button').on('click',function(){
        $(this).data('click',++cl_cnt);
        if (cl_cnt % 2 === 0) {
            service_list.css('height','0px');
            service_list.css('opacity','0');
            service_list.find('.active_border').removeClass('active_border').addClass('hidden_border');
            for(var i=1; i<=loop_cnt; i++){
                service_list.find('tr:nth-child('+i+') td').css('opacity','0');
            }
        } else {
            service_list.css('height',$table_height);
            service_list.css('opacity','1');
            service_list.find('.hidden_border').removeClass('hidden_border').addClass('active_border');
            for(var i=1; i<=loop_cnt; i++){
                service_list.find('tr:nth-child('+i+') td').css('opacity','1');
            }
        }
    });
});

// フワッと浮き上がる画像アニメーションとSNS menu
var setTimeoutId = null ;   /* setTimeout()を管理 */
var change_flg = true; // SNS menu position(top or side)
var mechanic_pic_height; //about_us.html
var mechanic_pic_width;  //about_us.html
var service_policy_width; // service.html

$(function(){
    $(window).on('scroll',function(){
        // setTimeoutで負荷軽減します
        if( setTimeoutId ) {
            return false ;
        }

        // setTimeoutイベントを実行
        setTimeoutId = setTimeout( function() {
            var scroll = $(window).scrollTop();
            //console.log(scroll);
            // スクロールイベントの処理(フワッと画像)
            $('.floating_effect_ar').each(function(){
                var imgPos = $(this).offset().top;
                
                var windowHeight = $(window).height();
                var windowWidth = $(window).width();
                // Don't animate on mobile size
                if (windowWidth <= 767) return;
                if (scroll > imgPos - windowHeight + windowHeight/5){
                    //console.log($(this).parent().attr('id'));
                    switch ($(this).parent().attr('id')){
                        case 'concept_cover_ar':
                            $('#concept_text_ar').css('opacity', '1').css('left','0em');
                            $('#cover_anime_concept').css('left','960px');
                            break;
                        case 'profile_ar':
                            $('#t_ab_us_txt_ar').css('opacity','1').css('margin-top','5%');
                            $('#cover_anime_greetings').css('right','2000px');
                            break;
                        case 'introduce':
                            $('#service_thumb_area img').css('opacity','1').css('margin-top','0');
                            break;
                        // about_us
                        case 'a_u_message':
                            $('.f_c_group_1').css('opacity','1').css('top','1em');
                            $('.f_c_group_2').css('opacity','1').css('top','6em');
                            //$('.f_c_group_3').css('opacity','1').css('top','18em');
                            break;
                        case 'profile_ar_box':
                            //console.log('in');
                            mechanic_pic_height = $('.pro_img_fig').height();
                            mechanic_pic_width = $('.pro_img_fig').width();
                            $('#cover_anime_hase').css('top',mechanic_pic_height+'px');
                            $('#cover_anime_joseph').css('left',mechanic_pic_width+'px');
                            break;
                        // service
                        case 'our_service_message':
                            $('.f_c_group_1').css('opacity','1').css('top','1em');
                            $('.f_c_group_2').css('opacity','1').css('top','11em');
                            $('.f_c_group_3').css('opacity','1').css('top','18em');
                            break;
                        case 'our_service_motto':
                            service_policy_width = $('#o_s_mot_box').width();
                            $('#cover_anime_service_motto').css('left',service_policy_width+'px');
                            $('#mot_text').css('margin-top','0').css('opacity','1');
                            break;
                        case 'our_service_costs':
                            $('#service_list_box_top figure').css('animation-play-state', 'running');
                            $('#service_list_box_bottom figure').css('animation-play-state', 'running');
                            break;
                        default:
                            //console.log('other fields'+$(this).parent().attr('class'));
                    }
                } else {
                    switch ($(this).parent().attr('id')){
                        case 'concept_cover_ar':
                            $('#concept_text_ar').css('opacity','0').css('left','-15em');
                            $('#cover_anime_concept').css('left','0');
                            break;
                        case 'profile_ar':
                            $('#t_ab_us_txt_ar').css('opacity','0').css('margin-top','10em');
                            $('#cover_anime_greetings').css('right','0');
                            break;
                        case 'introduce':
                            $('#service_thumb_area img').css('opacity','0').css('margin-top','4em');;
                            break;
                        // about_us 
                        case 'a_u_message':
                            $('.f_c_group_1').css('opacity','0').css('top','6em');
                            $('.f_c_group_2').css('opacity','0').css('top','11em');
                            //$('.f_c_group_3').css('opacity','0').css('top','23em');
                            break;
                        case 'profile_ar_box':
                            $('#cover_anime_hase').css('top','0');
                            $('#cover_anime_joseph').css('left','0');
                            break;
                        // service
                        case 'our_service_message':
                            $('.f_c_group_1').css('opacity','0').css('top','6em');
                            $('.f_c_group_2').css('opacity','0').css('top','16em');
                            $('.f_c_group_3').css('opacity','0').css('top','23em');
                            break;
                        case 'our_service_motto':
                            $('#cover_anime_service_motto').css('left','0');
                            $('#mot_text').css('margin-top','3em').css('opacity','0');
                            break;
                        default:
                            //console.log('other fields');
                    }
                }
            });
            // SNS menu
            if (change_flg){
                change_flg = false;
                // Don't replace SNS menu on News.html and Contact.html
                if (document.title == 'News' || document.title == 'Contact') return false;
                
                $('.slideTop_share_top').removeClass('slideTop_share_top').addClass('slideTop_share_side');
                setTimeout(function(){
                    $('.slideTop_share_side').css('top','3em');

                },100);
            }
            

            // 250ミリ秒後にsetTimeoutIdを空にする
            setTimeoutId = null ;
        }, 250 ) ;
    });
});

// Go to TOP
var syncerTimeout = null;
$(function(){
    $(window).on('scroll',function(){
        if(syncerTimeout == null){
            // setting setTimeout
            syncerTimeout = setTimeout(function(){
                //TOP-element
                var element = $('#page_top_scroll');

                //check display
                var visible = element.css('opacity');
                
                // トップから現在地までの距離取得
                var now = $(window).scrollTop();

                // 一番下から現在地までの距離取得
                var under = $('body').height() - (now+$(window).height());

                // 最上部から現在位置までの距離(now)が1500以上かつ
                // 最下部から現在位置までの距離(under)が200px以上かつ…
                if( now > 1300){
                    // 非表示状態だったら
                    if(visible == 0){
                        // fadeIn
                        element.css('opacity','1').css('pointer-events','auto');
                    }
                }

                // 表示状態だったら
                else if(visible == 1)
                {
                    // fadeOut
                    element.css('opacity','0').css('pointer-events','none');
                }

                // フラグを削除
                syncerTimeout = null ;
            }, 1000);
        }
    });

    // クリックイベントを設定する
    $( '#page_top_scroll' ).on('click',function(){
            // スムーズにスクロールする
            $( 'html,body' ).animate( {scrollTop:0} , 'slow' ) ;
        }
    ) ;
});

// overlay
$(function(){
    // for controling scroll
    var scrollpos;
    // クラス切り替え用
    var menu_cnt = 0;
    var modal_overlay = $('.modal-overlay-base');
    $('#sp_menu_bt').on('click', function(e) {
        if (menu_cnt % 2 === 0) {
            // overlay
            modal_overlay.addClass('modal-overlay-draw');
            // invert(100%) logo
            $('#logo').css('filter','invert(100%)');
            // changes menu icon
            $('.fa-bars').addClass('fa-window-close').removeClass('.fa-bars');
            // changes icon color
            $('#sp_menu_bt').css('color','#FFFFFF');
            // display menu
            $('.top_nav_item_sp').css('opacity','1');
            // deny scroll
            scrollpos = $(window).scrollTop();
            $('body').addClass('fixed').css({'top': -scrollpos});
            $('.menu').addClass('open');
            
            menu_cnt++;
        } else{
            // overlay
            modal_overlay.removeClass('modal-overlay-draw');
            // invert(100%) logo
            $('#logo').css('filter','invert(0%)');
            // changes menu icon
            $('.fa-window-close').addClass('fa-bars').removeClass('fa-window-close');
            // reset icon color
            $('#sp_menu_bt').css('color','#000000');
            // hide menu
            $('.top_nav_item_sp').css('opacity','0');
            // allow scroll
            $('body').removeClass('fixed').css({'top': 0});
            window.scrollTo( 0 , scrollpos );
            $('.menu').removeClass('open');
            
            menu_cnt++;
        }

    });
});

// swipe function for service list
$(function(){
    $('#service_thumb_area').on('touchstart',onTouchStart); // Notice to touch
    $('#service_thumb_area').on('touchmove',onTouchMove); // Notice to move
    $('#service_thumb_area').on('touchend',onTouchEnd); // Notice to leave

    var direction,position;
    var margin_left = 0;

    // Get lengthwise position when swipe starts
    function onTouchStart(event){
        position = getPosition(event);
        direction = '';
    }
    // めっちゃ命令が実行される？ 後に調査
    // Get direction(Left/Right)
    function onTouchMove(event){
        // if swipe move over 70px, it regard swipe
        if(position - getPosition(event) > 70){ 
            direction = 'left'; // regard left
        }else if(position - getPosition(event) < -70){
            direction = 'right'; // regard right
        }
    }

    function onTouchEnd(event) {
        if (direction == 'right'){
            if (margin_left == 0) return;
            margin_left += 19;
            $('#service_thumb_area').css('margin-left',margin_left+'em');
        } else if (direction == 'left'){
            if (margin_left == -38) return;
            margin_left -= 19;
            $('#service_thumb_area').css('margin-left',margin_left+'em');
        }
    }
    //横方向の座標を取得
    function getPosition(event) {
        return event.originalEvent.touches[0].pageX;
    }

});

// gmapのスクロール抑制
$(function() {
    var map = $('iframe');
    map.css('pointer-events', 'none');
    $('#a_gmap').on('click',function() {
        map.css('pointer-events', 'auto');
    });
    map.mouseout(function() {
        map.css('pointer-events', 'none');
    })
});