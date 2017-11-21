jQuery(document).ready(function ($) {

    $("body").on('click', '[href*="#"]', function (e) {
        var fixed_offset = 0;
        $('html,body').stop().animate({scrollTop: $(this.hash).offset().top - fixed_offset}, 1000);
        e.preventDefault();
    });

    /*Check Form*/
    /*
     $('input[type="file"]').on('change', function (event, files, label) {
     if (value.length == 0) {
     $('#txt_resume').addClass('err-text');
     } else {
     $('#txt_resume').removeClass('err-text');
     }
     });
     */
    $('#first_name').on('click change keyup blur', function () {
        var patt = new RegExp(/^[a-zA-Z0-9 ]*$/);
        var value = this.value;
        if (value.length <= 0 || patt.test(value) == false) {
            $('#txt_first_name').addClass('err-text');
        } else {
            $('#txt_first_name').removeClass('err-text');
        }
    });

    $('#last_name').on('click change keyup blur', function () {
        var patt = new RegExp(/^[a-zA-Z0-9 ]*$/);
        var value = this.value;
        if (value.length <= 0 || patt.test(value) == false) {
            $('#txt_last_name').addClass('err-text');
        } else {
            $('#txt_last_name').removeClass('err-text');
        }
    });

    $('#email').on('change keyup blur', function () {
        $('.view_err_email').hide();
        $('#txt_email').removeClass('err-text');
        $('#email').css('color', '');
        var patt = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$/);
        var value = this.value;
        if (value.length <= 0 || patt.test(value) == false) {
            $('#txt_email').addClass('err-text');
        } else {
            $('#txt_email').removeClass('err-text');
        }
    });

    $('#country').on('change', function () {
        if ($(this).val() == '') {
            $('#txt_country').addClass('err-text');
        } else {
            $('#txt_country').removeClass('err-text');
        }
    });

    $('#password, #re_password').on('change keyup blur', function () {
        if ($('#re_password').val() != '') {
            if ($('#password').val() == $('#re_password').val()) {
                $('#txt_pass').removeClass('err-text');
                $('#txt_re_pass').removeClass('err-text');
                $('#txt_pass').addClass('acc-text');
                $('#txt_re_pass').addClass('acc-text');
            } else {
                $('#txt_pass').addClass('err-text');
                $('#txt_re_pass').addClass('err-text');
            }
        }
        if ($('#re_password').val() == '') {
            $('#txt_pass').addClass('err-text');
            $('#txt_re_pass').addClass('err-text');
        }
    });

    $('#phone').on('click change keypress keyup', function () {

        var phone = $(this).val();
        var rep = /[;":'a-zA-Z]/;
        phone = phone.replace(rep, '');
        $(this).val(phone);

        if (!/^[\0-9\-\+\(\)]*$/i.test(phone) || phone == '' || phone.length < 8) {
            $('#txt_phone').addClass('err-text');
        } else {
            $('#txt_phone').removeClass('err-text');
        }

    });
    /*----------*/
    $('#re_code').on('click', function () {
        $('#txt_re_code').css('color', '');
        $('.err_code_img').html('');
    });
    $('#btn_applay').on('click', function () {

        if (bio_error() == 1) {
            return false;
        }
        $('#txt_pass').removeClass('acc-text');
        $('#txt_re_pass').removeClass('acc-text');
        $('#btn_applay').hide();
        $('#btn_reset').hide();
        $('.lader_img').show();
        var fd = new FormData();
        var other_data = $('#reg_form').serializeArray();
        $.each(other_data, function (key, input) {
            fd.append(input.name, input.value);
        });
	
        $.ajax({
            url: window.location.origin + '/registration/new_applicant',
            type: 'POST',
            data: fd,
            processData: false,
            contentType: false,
            success: function (data, status) {
                obj = JSON.parse(data);
                if (obj.res == '-1') {
                    $('#txt_email').addClass('err-text');
                    $("#code_img").html(obj.img);
                    $("#re_code").val('');
                    $('#email').css('color', 'red');
                    $('.view_err_email').show();
                }
                if (obj.res * 1 > 0) {
                    $('#myModal').show();
                    $('#wrap').show();
                    $("#reg_form")[0].reset();
                    setTimeout(function () {
                        $("#code_img").html(obj.img);
                        $("#myModal").hide();
                        $('#wrap').hide();
                    }, 10000);
                }
                if (obj.res == -3) {
                    $('#txt_re_code').css('color', 'red');
                    $('.err_code_img').html('Incorrect code');
                }
                $('#btn_applay').show();
                $('#btn_reset').show();
                $('.lader_img').hide();

            }
        });
        return false;
    });

    $('.close').on('click', function () {
        $('#wrap').hide();
        $('#myModal').hide();
        $('#err_mail').hide();
    });

});

function bio_error() {
    em = 0;
    if ($('#first_name').val() == '') {
        $('#txt_first_name').addClass('err-text');
    } else {
        $('#txt_first_name').removeClass('err-text');
    }
    if ($('#last_name').val() == '') {
        $('#txt_last_name').addClass('err-text');
    } else {
        $('#txt_last_name').removeClass('err-text');
    }
    if ($('#password').val() == '') {
        $('#txt_pass').addClass('err-text');
    } else {
        $('#txt_pass').removeClass('err-text');
    }
    if ($('#country').val() == '') {
        $('#txt_country').addClass('err-text');
    } else {
        $('#txt_country').removeClass('err-text');
    }
    if ($('#phone').val() == '') {
        $('#txt_phone').addClass('err-text');
    } else {
        $('#txt_phone').removeClass('err-text');
    }
    if ($('#re_password').val() == '') {
        $('#txt_re_pass').addClass('err-text');
    } else {
        $('#txt_re_pass').removeClass('err-text');
    }
    /*
     if ($('input[type="file"]').val() == '') {
     $('#txt_resume').addClass('err-text');
     } else {
     $('#txt_resume').removeClass('err-text');
     }
     */
    var patt = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$/);
    var value = $('#email').val();
    if (value.length <= 0 || patt.test(value) == false) {
        $('#txt_email').addClass('err-text');
        em = 0;
    } else {
        $('#txt_email').removeClass('err-text');
        em = 1;
    }

    if ($('#first_name').val() == '' || $('#password').val() == '' || $('#re_password').val() == '' || $('#country').val() == '' || $('#phone').val() == '' || em == 0) {/*|| $('input[type="file"]').val() == ''*/
        error1 = 1;
    } else {
        error1 = 0;

        if ($('#password').val() == $('#re_password').val()) {
            error1 = 0;
            $('#txt_pass').removeClass('err-text');
            $('#txt_re_pass').removeClass('err-text');
        } else {
            error1 = 1;
            $('#txt_pass').addClass('acc-text');
            $('#txt_re_pass').addClass('acc-text');
        }

    }

    return error1;
}
