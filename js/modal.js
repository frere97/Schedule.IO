var days = [{
        Name: 'Domingo',
        Value: '0',
        Checked: false
    },
    {
        Name: 'Segunda',
        Value: '1',
        Checked: false
    },
    {
        Name: 'Terça',
        Value: '2',
        Checked: false
    },
    {
        Name: 'Quarta',
        Value: '3',
        Checked: false
    },
    {
        Name: 'Quinta',
        Value: '4',
        Checked: false
    },
    {
        Name: 'Sexta',
        Value: '5',
        Checked: false
    },
    {
        Name: 'Sábado',
        Value: '6',
        Checked: false
    }
];


function aindaPodeEscolherDias(dias) {
    let contadorDeDiasMarcados = 0;
    dias.forEach((dia) => {
        if (dia.Checked) {
            contadorDeDiasMarcados++;
        }
    })

    return contadorDeDiasMarcados < 2;
}
(function($) {

    $.fn.daysOfWeekInput = function() {
        return this.each(function() {
            var $field = $(this);
            var currentDays = $field.val().split('');
            for (var i = 0; i < currentDays.length; i++) {
                var dayA = currentDays[i];
                for (var n = 0; n < days.length; n++) {
                    var dayB = days[n];
                    if (dayA === dayB.Value) {
                        dayB.Checked = true;
                    }
                }
            }

            // Make the field hidden when in production.
            $field.attr('type', 'hidden');

            var options = '';
            var n = 0;
            while ($('.days' + n).length) {
                n = n + 1;
            }

            var optionsContainer = 'days' + n;
            $field.before('<div class="days ' + optionsContainer + '"></div>');

            for (var i = 0; i < days.length; i++) {
                var day = days[i];
                var id = 'day' + day.Name + n;
                var checked = day.Checked ? 'checked="checked"' : '';
                options = options + '<div><input type="checkbox" value="' + day.Value + '" id="' + id + '" ' + checked + ' /><label class="date-label" for="' + id + '">' + day.Name + '</label>&nbsp;&nbsp;</div>';
            }

            $('.' + optionsContainer).html(options);

            $('body').on('change', '.' + optionsContainer + ' input[type=checkbox]', function(event) {
                var value = $(this).val();
                var index = getIndex(value);
                var label = $("label[for='day" + days[index].Name + "0']")
                if (this.checked) { //Caso esteja marcando um dia
                    if (!aindaPodeEscolherDias(days)) {
                        event.preventDefault()
                        $("#datepicker-error").text('Você só pode escolher dois dias: início e fim')
                        this.checked = false;
                        return;
                    }
                    //updateField(value, index);
                    days[index].Checked = true;
                    label.css('color', '#333')
                    label.addClass('date-label-checked')
                } else { // Caso esteja tirando a seleção do dia
                    updateField(' ', index);
                    days[index].Checked = false;
                    $("#datepicker-error").text("")
                    $("label[for='day" + days[index].Name + "0']").css('color', '#ccc')
                    label.removeClass('date-label-checked')
                }
            });

            function getIndex(value) {
                for (i = 0; i < days.length; i++) {
                    if (value === days[i].Value) {
                        return i;
                    }
                }
            }

            function updateField(value, index) {
                $field.val($field.val().substr(0, index) + value + $field.val().substr(index + 1)).change();
            }
        });
    }

})(jQuery);

$('.days-of-week').daysOfWeekInput();

$("#salvar-tarefa").on('click', (event) => {
    let formValues = $("#form-adicionar-tarefa").serializeArray()
    let inicioFim = (days) => {
        return days.filter((day) => {
            return day.Checked == true
        })
    }
    formValues.push({
        name: 'inicio-fim',
        value: inicioFim(days)
    })
    if (formValues[5].value.length == 1) {
        formValues[5].value.push({
            Name: formValues[5].value[0].Name,
            Value: formValues[5].value[0].Value,
            Checked: true,
        })
    }

    RecebeDados(formValues[5].value[0].Value, formValues[5].value[1].Value, formValues[0].value, formValues[1].value, formValues[4].value, formValues[2].value)
})