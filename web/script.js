let selectedDrug = null;
let customerAmount = null;
let resName = null;

$(() => {
    window.addEventListener('message', (event) => {
        if (event.data.action === 'open') {
            $('.nui-wrapper').fadeIn(100);
            let type = event.data.type;
            if (type == 1) {
                resName = event.data.resName;
                $('.message').empty();
                $('.message').append(`
                    <i class="fa fa-user icon-blue" aria-hidden="true"></i>
                    <div class="text">${event.data.strangerPhrase}</div>
                `);
                $('.choices').empty();
                $('.choices').append(`
                    <div class="choice hover" id="accept-1" style="width: 49%;">
                        <i class="fa fa-comments icon-green" aria-hidden="true"></i>
                        <div class="text">${event.data.sellerPhraseAccept}</div>
                    </div>
                    <div class="choice hover" id="quit" style="width: 50%;">
                        <i class="fa fa-sign-out icon-red" aria-hidden="true"></i>
                        <div class="text">${event.data.sellerPhraseDecline}</div>
                    </div>
                `);

                $("#quit").click(() => {
                    quit();
                });

                $('#accept-1').click(() => {
                    $.post('https://' + resName + '/accept-1', JSON.stringify({}));
                })
            } else if (type == 2) {
                $('.item-select').css('display', 'flex');
                let items = event.data.drugs;
                $('.item-select').empty();
                Object.values(items).forEach((item, i) => {
                    $('.item-select').append(`
                    <div class="item-slot hover-green" id="drug-${i}">
                        <img src="./assets/${item.name}.png" alt="">
                        <div class="item-name">${item.label}</div>
                    </div>
                    `)
                    $("#drug-" + i).click(() => {
                        if (selectedDrug) {
                            $("#drug-" + selectedDrug.index).css('border', 'none');
                            $("#drug-" + selectedDrug.index).css('box-shadow', 'none');
                        }
                        selectedDrug = item;
                        selectedDrug.index = i;
                        $("#drug-" + i).css('scale', '1.01');
                        $("#drug-" + i).css('box-shadow', '0 0 8px #28dcb6');
                        $("#drug-" + i).css('border', '2px solid #28dcb6');
                        $('.choices').empty();
                        $('.choices').append(`
                            <div class="choice hover" id="accept-2" style="width: 40%;">
                                <i class="fa fa-comments icon-green" aria-hidden="true"></i>
                                <div class="text">${event.data.sellerPhraseAccept} <span style="color: #3edaab; font-family: 'Gilroy-SemiBold';">${selectedDrug ? selectedDrug.label : ''}</span></div>
                            </div>
                            <div class="choice hover" id="quit" style="width: 59%;">
                                <i class="fa fa-sign-out icon-red" aria-hidden="true"></i>
                                <div class="text">${event.data.sellerPhraseDecline}</div>
                            </div>
                        `)
                        if (selectedDrug) {
                            $('#accept-2').click(() => {
                                $.post('https://' + resName + '/accept-2', JSON.stringify({
                                    drug: selectedDrug
                                }));
                            })
                        }
                        $("#quit").click(() => {
                            quit();
                        })
                    });
                });


                $('.message').empty();
                $('.message').append(`
                    <i class="fa fa-user icon-blue" aria-hidden="true"></i>
                    <div class="text">${event.data.strangerPhrase}</div>
                `)

                $('.choices').empty();
                $('.choices').append(`
                    <div class="choice hover" id="accept-2" style="width: 40%;">
                        <i class="fa fa-comments icon-green" aria-hidden="true"></i>
                        <div class="text">${event.data.sellerPhraseAccept} <span style="color: #3edaab; font-family: 'Gilroy-SemiBold';">${selectedDrug ? selectedDrug.label : ''}</span></div>
                    </div>
                    <div class="choice hover" id="quit" style="width: 59%;">
                        <i class="fa fa-sign-out icon-red" aria-hidden="true"></i>
                        <div class="text">${event.data.sellerPhraseDecline}</div>
                    </div>
                `)

                $("#quit").click(() => {
                    quit();
                })

                if (selectedDrug) {
                    $('#accept-2').click(() => {
                        $.post('https://' + resName + '/accept-2', JSON.stringify({
                            drug: selectedDrug
                        }));
                    })
                }
            } else if (type == 3) {
                $('.item-select').fadeOut(100);
                let amount = Math.floor(Math.random() * (selectedDrug.maxOffer - selectedDrug.minOffer + 1)) + selectedDrug.minOffer;
                customerAmount = amount;
                $('.message').empty();
                $('.message').append(`
                    <i class="fa fa-user icon-blue" aria-hidden="true"></i>
                    <div class="text">Okay, I'll take ${amount} pieces of ${selectedDrug.label}. How much do you want per quantity?</div>
                `);
                $('.choices').empty();
                $('.choices').append(`
                    <div class="choice" style="width: 40%;">
                        <i class="fa fa-usd icon-green" aria-hidden="true"></i>
                        <div class="input">
                            <input type="number" id="amount-input" min="0" value="1">
                            <svg id="input-svg" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                                viewBox="0 0 17.837 17.837" xml:space="preserve">
                                <g>
                                    <path  d="M16.145,2.571c-0.272-0.273-0.718-0.273-0.99,0L6.92,10.804l-4.241-4.27
                                        c-0.272-0.274-0.715-0.274-0.989,0L0.204,8.019c-0.272,0.271-0.272,0.717,0,0.99l6.217,6.258c0.272,0.271,0.715,0.271,0.99,0
                                        L17.63,5.047c0.276-0.273,0.276-0.72,0-0.994L16.145,2.571z"/>
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div class="choice" style="width: 59%;" id="other">
                        <i class="fa fa-sign-out icon-red" aria-hidden="true"></i>
                        <div class="text">${event.data.sellerOtherOffer}</div>
                    </div>
                `)
                $('#amount-input').on('input', () => {
                    if ($('#amount-input').val() <= 0) {
                        $('#amount-input').val(0);
                    }
                    if ($('#amount-input').val() < 1) {
                        $("#input-svg").addClass('disabled');
                    } else {
                        if ($('#amount-input').val().charAt(0) == '0') {
                            $('#amount-input').val($('#amount-input').val().substring(1));
                        }
                        $("#input-svg").removeClass('disabled');
                    }
                })

                $("#input-svg").click(() => {
                    if ($('#amount-input').val() < 1) {
                        return;
                    }
                    
                    $.post('https://' + resName + '/accept-3', JSON.stringify({
                        amount: $('#amount-input').val(),
                        drug: selectedDrug,
                        proposedPrice: parseInt($('#amount-input').val())
                    }));
                })
            } else if (type == 4) {
                $('.message').empty();
                $('.message').append(`
                    <i class="fa fa-user icon-blue" aria-hidden="true"></i>
                    <div class="text">${event.data.strangerText}</div>
                `)
                $('.choices').empty();
                $('.choices').append(`
                    <div class="choice" style="width: 49%;" id="accept-4">
                        <i class="fa fa-comments icon-green" aria-hidden="true"></i>
                        <div class="text">${event.data.sellerText}</div>
                    </div>
                    <div class="choice" style="width: 50%;" id="quit">
                        <i class="fa fa-sign-out icon-red" aria-hidden="true"></i>
                        <div class="text">${event.data.declineText}</div>
                    </div>
                `);

                $("#quit").click(() => {
                    quit();
                });

                $("#accept-4").click(() => {
                    $.post('https://' + resName + '/accept-4', JSON.stringify({
                        drug: selectedDrug,
                        amount: parseInt(customerAmount),
                        proposedPrice: parseInt(event.data.proposedPrice)
                    }));
                    $('.nui-wrapper').fadeOut(100);
                    $('.item-select').fadeOut(100);
                    quit();
                })
            } else if (type == 5) {
                $('.message').empty();
                $('.message').append(`
                    <i class="fa fa-user icon-blue" aria-hidden="true"></i>
                    <div class="text">${event.data.rejectionText}</div>
                `)
                $('.choices').empty();
                $('.choices').append(`
                    <div class="choice" style="width: 40%;">
                        <i class="fa fa-usd icon-green" aria-hidden="true"></i>
                        <div class="input">
                            <input type="number" id="amount-input" min="0" value="1">
                            <svg id="input-svg" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                                viewBox="0 0 17.837 17.837" xml:space="preserve">
                                <g>
                                    <path  d="M16.145,2.571c-0.272-0.273-0.718-0.273-0.99,0L6.92,10.804l-4.241-4.27
                                        c-0.272-0.274-0.715-0.274-0.989,0L0.204,8.019c-0.272,0.271-0.272,0.717,0,0.99l6.217,6.258c0.272,0.271,0.715,0.271,0.99,0
                                        L17.63,5.047c0.276-0.273,0.276-0.72,0-0.994L16.145,2.571z"/>
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div class="choice" style="width: 59%;" id="quit">
                        <i class="fa fa-sign-out icon-red" aria-hidden="true"></i>
                        <div class="text">${event.data.sellerDeclineText}</div>
                    </div>
                `)
                $('#amount-input').on('input', () => {
                    if ($('#amount-input').val() <= 0) {
                        $('#amount-input').val(0);
                    }
                    if ($('#amount-input').val() < 1) {
                        $("#input-svg").addClass('disabled');
                    } else {
                        if ($('#amount-input').val().charAt(0) == '0') {
                            $('#amount-input').val($('#amount-input').val().substring(1));
                        }
                        $("#input-svg").removeClass('disabled');
                    }
                })

                $("#input-svg").click(() => {
                    if ($('#amount-input').val() < 1) {
                        return;
                    }
                    $.post('https://' + resName + '/accept-3', JSON.stringify({
                        amount: $('#amount-input').val(),
                        drug: selectedDrug,
                        proposedPrice: parseInt($('#amount-input').val())
                    }));
                })

                $("#quit").click(() => {
                    selectedDrug = null;
                    customerAmount = null;
                    quit();
                })
            }
        } else if (event.data.action == 'openZone') {
            $('.nui-wrapper-rumors').fadeIn(100);
            $('.rumors-title').text((event.data.streetName).toUpperCase() + ' RUMORS');
            $('.rumors-list').empty();
            resName = event.data.resName;
            Object.values(event.data.rumors).forEach((rumor, i) => {
                if (rumor.owned) {
                    $('.rumors-list').append(`
                        <div class="rumor">
                            <i class="fa fa-user icon-green" aria-hidden="true"></i>
                            <div class="text">I heard that <span style="color: #ff4d4d; font-family: 'Gilroy-SemiBold';">${rumor.owner}</span> is selling a lot of <span style="color: #ff4d4d; font-family: 'Gilroy-SemiBold';">${rumor.drug}</span> in this street.</div>
                        </div>
                    `);
                } else {
                    $('.rumors-list').append(`
                        <div class="rumor">
                            <i class="fa fa-user icon-green" aria-hidden="true"></i>
                            <div class="text">No one seems to control this zone for selling <span style="color: #ff4d4d; font-family: 'Gilroy-SemiBold';">${rumor.drug}</span>.</div>
                        </div>
                    `);
                }
            });

            // on escape
            $(document).keyup(function (e) {
                if (e.key === "Escape") {
                    $.post('https://' + resName + '/quit', JSON.stringify({}));
                    $('.nui-wrapper-rumors').fadeOut(100);
                }
            });
        }
    })

    const quit = () => {
        $.post('https://' + resName + '/quit', JSON.stringify({}));
        $('.nui-wrapper').fadeOut(100);
        $('.item-select').fadeOut(100);
    }
})