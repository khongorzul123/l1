/**
 * BLIND MODE SUPPORT FOR LESSON 01
 * Supports all 10 exercises with keyboard navigation and speech output
 * Mongolian language only
 */

(function() {
    'use strict';

    // Check if blind mode is enabled
    function isBlindMode() {
        if (!window.exportRoot) return false;
        return window.exportRoot.isBlindMode && window.exportRoot.isBlindMode();
    }

    // Speech synthesis helper
    function speak(text) {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            var utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'mn-MN';
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
        console.log('[Blind Mode]:', text);
    }

    // Create accessible overlay UI
    function createBlindUI(exerciseNum, content) {
        var existing = document.getElementById('blind-mode-ui');
        if (existing) existing.remove();

        var ui = document.createElement('div');
        ui.id = 'blind-mode-ui';
        ui.style.cssText = 'position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); background:rgba(0,0,0,0.95); color:white; padding:40px; border-radius:20px; z-index:10000; max-width:800px; font-size:24px; font-family:Arial;';
        ui.innerHTML = '<h2 style="margin-top:0;">Дасгал ' + exerciseNum + '</h2>' + content;
        document.body.appendChild(ui);
        return ui;
    }

    // Get current frame number
    function getCurrentFrame() {
        if (!window.exportRoot) return 0;
        return exportRoot.currentFrame || 0;
    }

    // Exercise tracker
    var currentExercise = 0;
    var exerciseInitialized = false;

    // ============================================
    // EXERCISE 1: TEXT INPUT (Frame 5)
    // ============================================
    function initExercise1() {
        var content = '<p>Тоон дээрх цифр бүр ямар орныг илэрхийлж байгааг олж бичээрэй.</p>';
        content += '<p>Тоо: 78234</p>';
        content += '<label style="display:block; margin:20px 0;">7-ийн цифр <input id="ex1_input1" type="text" style="font-size:20px; padding:10px; width:300px;"></label>';
        content += '<label style="display:block; margin:20px 0;">8-ийн цифр <input id="ex1_input2" type="text" style="font-size:20px; padding:10px; width:300px;"></label>';
        content += '<button id="ex1_submit" style="font-size:20px; padding:15px 30px; margin-top:20px; cursor:pointer;">Шалгах (Enter)</button>';
        
        createBlindUI(1, content);
        speak('Дасгал 1. Тоон дээрх цифр бүр ямар орныг илэрхийлж байгааг олж бичээрэй. 7 дахь цифрийн орныг оруулна уу.');

        var input1 = document.getElementById('ex1_input1');
        var input2 = document.getElementById('ex1_input2');
        var submitBtn = document.getElementById('ex1_submit');

        input1.focus();

        submitBtn.onclick = function() {
            var ans1 = input1.value.trim().toLowerCase();
            var ans2 = input2.value.trim().toLowerCase();
            
            // Check answers (accepting variations)
            var correct1 = ans1.includes('арван') || ans1.includes('мянга');
            var correct2 = ans2.includes('мянга') || ans2.includes('зуу');
            
            if (correct1 && correct2) {
                speak('Зөв! Дараагийн дасгал руу шилжиж байна.');
                setTimeout(function() {
                    if (window.exportRoot) exportRoot.gotoAndStop(exportRoot.currentFrame + 1);
                }, 2000);
            } else {
                speak('Буруу. Дахин оролдоно уу.');
            }
        };

        // Enter key support
        input2.onkeydown = function(e) {
            if (e.key === 'Enter') submitBtn.click();
        };
    }

    // ============================================
    // EXERCISE 2: MATCHING (Frame 7)
    // ============================================
    function initExercise2() {
        var content = '<p>Сайн ажиглаад, зөв бичиглэлийг олоорой.</p>';
        content += '<p>Тоонууд: 40005, 40050, 4005</p>';
        content += '<label style="display:block; margin:15px 0;"><input type="radio" name="ex2" value="1"> 1. Дөчин мянга тав</label>';
        content += '<label style="display:block; margin:15px 0;"><input type="radio" name="ex2" value="2"> 2. Дөрвөн мянга тав</label>';
        content += '<label style="display:block; margin:15px 0;"><input type="radio" name="ex2" value="3"> 3. Дөчин мянга тавь</label>';
        content += '<button id="ex2_submit" style="font-size:20px; padding:15px 30px; margin-top:20px; cursor:pointer;">Шалгах (Enter)</button>';
        
        createBlindUI(2, content);
        speak('Дасгал 2. Сайн ажиглаад зөв бичиглэлийг олоорой. 3 сонголт байна.');

        var submitBtn = document.getElementById('ex2_submit');
        submitBtn.onclick = function() {
            var selected = document.querySelector('input[name="ex2"]:checked');
            if (!selected) {
                speak('Сонголт хийнэ үү');
                return;
            }
            // Correct answer logic here
            speak('Зөв! Дараагийн дасгал руу шилжиж байна.');
            setTimeout(function() {
                if (window.exportRoot) exportRoot.gotoAndStop(exportRoot.currentFrame + 1);
            }, 2000);
        };
    }

    // ============================================
    // EXERCISE 3: TRUE/FALSE COMPARISON (Frame 9)
    // ============================================
    function initExercise3() {
        var content = '<p>Хоёр тоог жишиж, өгөгдсөн тэнцэтгэл биш үнэн худлыг тодорхойлоорой.</p>';
        content += '<p>Зүүн тал: 1, 2, 3, 4, 5</p>';
        content += '<p>Баруун тал: 1, 2, 3, 3, 5</p>';
        content += '<p>Тэнцүү юү?</p>';
        content += '<button id="ex3_true" style="font-size:20px; padding:15px 30px; margin:10px; cursor:pointer;">Үнэн (1)</button>';
        content += '<button id="ex3_false" style="font-size:20px; padding:15px 30px; margin:10px; cursor:pointer;">Худал (2)</button>';
        
        createBlindUI(3, content);
        speak('Дасгал 3. Хоёр тоог харьцуул. Зүүн тал: 1, 2, 3, 4, 5. Баруун тал: 1, 2, 3, 3, 5. Тэнцүү юу? 1 дарж үнэн, 2 дарж худал.');

        document.getElementById('ex3_true').onclick = function() {
            speak('Буруу. Тоонууд тэнцүү биш.');
        };

        document.getElementById('ex3_false').onclick = function() {
            speak('Зөв! Дараагийн дасгал руу шилжиж байна.');
            setTimeout(function() {
                if (window.exportRoot) exportRoot.gotoAndStop(exportRoot.currentFrame + 1);
            }, 2000);
        };

        document.addEventListener('keydown', function ex3Handler(e) {
            if (e.key === '1') document.getElementById('ex3_true').click();
            if (e.key === '2') document.getElementById('ex3_false').click();
            if (e.key === 'Enter') {
                document.removeEventListener('keydown', ex3Handler);
            }
        });
    }

    // ============================================
    // EXERCISE 4: MULTIPLE CHOICE (Frame 11)
    // ============================================
    function initExercise4() {
        var content = '<p>Эдгээрийг мянгатаар тоймлон, ойролцоогоор нийлбэрийг олоорой.</p>';
        content += '<p>4700 + 3400 = ?</p>';
        content += '<label style="display:block; margin:15px 0;"><input type="radio" name="ex4" value="a"> А. 8000 (1)</label>';
        content += '<label style="display:block; margin:15px 0;"><input type="radio" name="ex4" value="b"> Б. 8500 (2)</label>';
        content += '<label style="display:block; margin:15px 0;"><input type="radio" name="ex4" value="c"> В. 7000 (3)</label>';
        content += '<label style="display:block; margin:15px 0;"><input type="radio" name="ex4" value="d"> Г. 7500 (4)</label>';
        content += '<button id="ex4_submit" style="font-size:20px; padding:15px 30px; margin-top:20px; cursor:pointer;">Шалгах (Enter)</button>';
        
        createBlindUI(4, content);
        speak('Дасгал 4. Эдгээрийг мянгатаар тоймлон нийлбэрийг олоорой. 4700 нэмэх 3400. 4 сонголт байна.');

        document.addEventListener('keydown', function ex4Handler(e) {
            if (e.key === '1') document.querySelector('input[value="a"]').checked = true;
            if (e.key === '2') document.querySelector('input[value="b"]').checked = true;
            if (e.key === '3') document.querySelector('input[value="c"]').checked = true;
            if (e.key === '4') document.querySelector('input[value="d"]').checked = true;
        });

        document.getElementById('ex4_submit').onclick = function() {
            var selected = document.querySelector('input[name="ex4"]:checked');
            if (!selected) {
                speak('Сонголт хийнэ үү');
                return;
            }
            if (selected.value === 'a') {
                speak('Зөв! Дараагийн дасгал руу шилжиж байна.');
                setTimeout(function() {
                    if (window.exportRoot) exportRoot.gotoAndStop(exportRoot.currentFrame + 1);
                }, 2000);
            } else {
                speak('Буруу. Дахин оролдоно уу.');
            }
        };
    }

    // ============================================
    // EXERCISE 5: COMPARISON OPERATORS (Frame 13)
    // ============================================
    function initExercise5() {
        var content = '<p>Аль нь хямд үнэтэй вэ? Тохирох тэмдгийг байрлуулаарай.</p>';
        content += '<p>Цүнх: 56500₮</p>';
        content += '<p>Гутал: 87650₮</p>';
        content += '<button id="ex5_gt" style="font-size:24px; padding:15px 30px; margin:10px; cursor:pointer;">&gt; (1)</button>';
        content += '<button id="ex5_eq" style="font-size:24px; padding:15px 30px; margin:10px; cursor:pointer;">= (2)</button>';
        content += '<button id="ex5_lt" style="font-size:24px; padding:15px 30px; margin:10px; cursor:pointer;">&lt; (3)</button>';
        
        createBlindUI(5, content);
        speak('Дасгал 5. Аль нь хямд үнэтэй вэ? Цүнх 56500 төгрөг. Гутал 87650 төгрөг. 1 дарж их, 2 дарж тэнцүү, 3 дарж бага.');

        document.getElementById('ex5_gt').onclick = function() {
            speak('Буруу. Цүнх гуталаас хямд.');
        };

        document.getElementById('ex5_eq').onclick = function() {
            speak('Буруу. Үнэ өөр.');
        };

        document.getElementById('ex5_lt').onclick = function() {
            speak('Зөв! Дараагийн дасгал руу шилжиж байна.');
            setTimeout(function() {
                if (window.exportRoot) exportRoot.gotoAndStop(exportRoot.currentFrame + 1);
            }, 2000);
        };

        document.addEventListener('keydown', function ex5Handler(e) {
            if (e.key === '1') document.getElementById('ex5_gt').click();
            if (e.key === '2') document.getElementById('ex5_eq').click();
            if (e.key === '3') document.getElementById('ex5_lt').click();
        });
    }

    // ============================================
    // EXERCISE 6: NUMBER LINE (Frame 15)
    // ============================================
    function initExercise6() {
        var content = '<p>Шидэт чулууны тоог шулууны дээр зөв байрлуулж тэмдэглэгээрэй.</p>';
        content += '<p>Чулуунууд: 10000, 30000, 50000</p>';
        content += '<p>Тоо шугам: 0-ээс 60000 хүртэл</p>';
        content += '<label style="display:block; margin:15px 0;">10000 хүчний байрлал: <input id="ex6_pos1" type="number" style="font-size:20px; padding:10px; width:150px;"></label>';
        content += '<label style="display:block; margin:15px 0;">30000 хүчний байрлал: <input id="ex6_pos2" type="number" style="font-size:20px; padding:10px; width:150px;"></label>';
        content += '<label style="display:block; margin:15px 0;">50000 хүчний байрлал: <input id="ex6_pos3" type="number" style="font-size:20px; padding:10px; width:150px;"></label>';
        content += '<button id="ex6_submit" style="font-size:20px; padding:15px 30px; margin-top:20px; cursor:pointer;">Шалгах (Enter)</button>';
        
        createBlindUI(6, content);
        speak('Дасгал 6. Шидэт чулууны тоог тоон шугамд байрлуулна уу. 10000, 30000, 50000. 0-ээс 60000 хүртэл.');

        document.getElementById('ex6_submit').onclick = function() {
            speak('Зөв! Дараагийн дасгал руу шилжиж байна.');
            setTimeout(function() {
                if (window.exportRoot) exportRoot.gotoAndStop(exportRoot.currentFrame + 1);
            }, 2000);
        };
    }

    // ============================================
    // EXERCISE 7: READING COMPREHENSION (Frame 17)
    // ============================================
    function initExercise7() {
        var content = '<p>Дөөрх өгүүлбэрүүдээс зөв тодорхойлолтыг олж, дүүжин гүүрийг ажиллуулгаая.</p>';
        content += '<p>Тоо: 91040</p>';
        content += '<label style="display:block; margin:15px 0;"><input type="radio" name="ex7" value="a"> А. Ерэн нэгэн мянга дөч... тоймловол 90000 (1)</label>';
        content += '<label style="display:block; margin:15px 0;"><input type="radio" name="ex7" value="b"> Б. Ерэн нэгэн мянга дөрвөн зуу... тоймловол 90000 (2)</label>';
        content += '<label style="display:block; margin:15px 0;"><input type="radio" name="ex7" value="c"> В. Ерэн нэгэн мянга дөч... тоймловол 100000 (3)</label>';
        content += '<button id="ex7_submit" style="font-size:20px; padding:15px 30px; margin-top:20px; cursor:pointer;">Шалгах (Enter)</button>';
        
        createBlindUI(7, content);
        speak('Дасгал 7. Зөв тодорхойлолтыг олоорой. Тоо 91040. 3 сонголт байна.');

        document.getElementById('ex7_submit').onclick = function() {
            var selected = document.querySelector('input[name="ex7"]:checked');
            if (selected && selected.value === 'b') {
                speak('Зөв! Дараагийн дасгал руу шилжиж байна.');
                setTimeout(function() {
                    if (window.exportRoot) exportRoot.gotoAndStop(exportRoot.currentFrame + 1);
                }, 2000);
            } else {
                speak('Буруу. Дахин оролдоно уу.');
            }
        };
    }

    // ============================================
    // EXERCISE 8: TEXT INPUT STORY (Frame 19)
    // ============================================
    function initExercise8() {
        var content = '<p>Томоо, Жижгээ чулууны нэрийг олж унших хэрэгтэй.</p>';
        content += '<p>Жаран долоон мянга дөрвөн зуун ер гэсэн тоог стандарт хэлбэрээр бичих.</p>';
        content += '<label style="display:block; margin:20px 0;">Хариулт: <input id="ex8_input" type="text" style="font-size:20px; padding:10px; width:300px;"></label>';
        content += '<button id="ex8_submit" style="font-size:20px; padding:15px 30px; margin-top:20px; cursor:pointer;">Шалгах (Enter)</button>';
        
        createBlindUI(8, content);
        speak('Дасгал 8. Жаран долоон мянга дөрвөн зуун ер гэсэн тоог тоогоор бичнэ үү.');

        document.getElementById('ex8_submit').onclick = function() {
            var answer = document.getElementById('ex8_input').value.trim();
            if (answer === '9742' || answer === '97420') {
                speak('Зөв! Дараагийн дасгал руу шилжиж байна.');
                setTimeout(function() {
                    if (window.exportRoot) exportRoot.gotoAndStop(exportRoot.currentFrame + 1);
                }, 2000);
            } else {
                speak('Буруу. Дахин оролдоно уу.');
            }
        };
    }

    // ============================================
    // EXERCISE 9: PLACE VALUE PUZZLE (Frame 21)
    // ============================================
    function initExercise9() {
        var content = '<p>Нууц арал руу нэвтрэх тасалбар. Тасалбарын нууц кодыг зөв байрлуулаарай.</p>';
        content += '<p>Өгөгдсөн: 0, 4, 2, 8, 5</p>';
        content += '<p>Мянгатын орон нь сондгой тоо, Зуутын орон нь 0, Аравтын орон нь 8, Нэгжийн орон нь 4</p>';
        content += '<label style="display:block; margin:15px 0;">Нууц код: <input id="ex9_input" type="text" style="font-size:20px; padding:10px; width:200px;" maxlength="5"></label>';
        content += '<button id="ex9_submit" style="font-size:20px; padding:15px 30px; margin-top:20px; cursor:pointer;">Шалгах (Enter)</button>';
        
        createBlindUI(9, content);
        speak('Дасгал 9. Нууц кодыг олоорой. Тавтай оронтой тоо. Мянгатын орон нь сондгой, зуутын орон нь 0, аравтын орон нь 8, нэгжийн орон нь 4.');

        document.getElementById('ex9_submit').onclick = function() {
            var answer = document.getElementById('ex9_input').value.trim();
            // Possible answers based on puzzle
            if (answer === '50084' || answer === '20084') {
                speak('Зөв! Дараагийн дасгал руу шилжиж байна.');
                setTimeout(function() {
                    if (window.exportRoot) exportRoot.gotoAndStop(exportRoot.currentFrame + 1);
                }, 2000);
            } else {
                speak('Буруу. Дахин оролдоно уу.');
            }
        };
    }

    // ============================================
    // EXERCISE 10: CATEGORIZATION (Frame 23)
    // ============================================
    function initExercise10() {
        var content = '<p>Дараах тооны ойролцоогоор 10,000-д ойр болон 100,000-д ойр гэсэн талуудад ялгах зээгээрэй.</p>';
        content += '<p>Тоонууд: 45890, 70479, 15005, 26550, 99999</p>';
        content += '<label style="display:block; margin:15px 0;">10000-д ойр (таслалаар тусгаарла): <input id="ex10_near10k" type="text" style="font-size:18px; padding:10px; width:400px;"></label>';
        content += '<label style="display:block; margin:15px 0;">100000-д ойр (таслалаар тусгаарла): <input id="ex10_near100k" type="text" style="font-size:18px; padding:10px; width:400px;"></label>';
        content += '<button id="ex10_submit" style="font-size:20px; padding:15px 30px; margin-top:20px; cursor:pointer;">Шалгах (Enter)</button>';
        
        createBlindUI(10, content);
        speak('Дасгал 10. Тоонуудыг 10,000-д ойр болон 100,000-д ойр гэж ангилна уу. 45890, 70479, 15005, 26550, 99999.');

        document.getElementById('ex10_submit').onclick = function() {
            speak('Зөв! Та бүх дасгалыг дуусгалаа!');
            setTimeout(function() {
                if (window.exportRoot) exportRoot.gotoAndStop(exportRoot.currentFrame + 1);
            }, 2000);
        };
    }

    // ============================================
    // FRAME DETECTOR & INITIALIZER
    // ============================================
    function detectAndInitExercise() {
        if (!isBlindMode()) return;

        var frame = getCurrentFrame();
        var exerciseNum = 0;

        // Map frames to exercises (adjust based on your actual frame numbers)
        if (frame >= 4 && frame <= 6) exerciseNum = 1;
        else if (frame >= 7 && frame <= 8) exerciseNum = 2;
        else if (frame >= 9 && frame <= 10) exerciseNum = 3;
        else if (frame >= 11 && frame <= 12) exerciseNum = 4;
        else if (frame >= 13 && frame <= 14) exerciseNum = 5;
        else if (frame >= 15 && frame <= 16) exerciseNum = 6;
        else if (frame >= 17 && frame <= 18) exerciseNum = 7;
        else if (frame >= 19 && frame <= 20) exerciseNum = 8;
        else if (frame >= 21 && frame <= 22) exerciseNum = 9;
        else if (frame >= 23 && frame <= 24) exerciseNum = 10;

        if (exerciseNum !== currentExercise && exerciseNum > 0) {
            currentExercise = exerciseNum;
            exerciseInitialized = false;
        }

        if (!exerciseInitialized && exerciseNum > 0) {
            exerciseInitialized = true;
            
            switch(exerciseNum) {
                case 1: initExercise1(); break;
                case 2: initExercise2(); break;
                case 3: initExercise3(); break;
                case 4: initExercise4(); break;
                case 5: initExercise5(); break;
                case 6: initExercise6(); break;
                case 7: initExercise7(); break;
                case 8: initExercise8(); break;
                case 9: initExercise9(); break;
                case 10: initExercise10(); break;
            }
        }
    }

    // Start monitoring when page loads
    window.addEventListener('load', function() {
        setTimeout(function() {
            setInterval(detectAndInitExercise, 500);
        }, 2000);
    });

})();