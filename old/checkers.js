/*$(document).on('click', '.checker-cell', function(){
				//find cell info
				click_cell = $(this).attr('data-cell');
				
				//find checker info
				click_check = $(this).children('div').attr('data-checker');

				//find row data
				click_next_row = $(this).parent().closest('.cr').find('div').attr('id');
				
				console.log(click_next_row);
				

				//remove class from all elements

				if ($('.checker-cell').hasClass('move-checker')){

					if (($(this).children('div').length > 0) && ($(this).children('div').hasClass('checker'))){
						alert("You cannot move there");
						$('.checker-cell').removeClass('move-checker');
					}else{

						if ( ($(this).hasClass('black')) && ($(this).parent().attr('id').split('_')[0] != click_p2)  ){
							//if row id matches.. stops sideways moves
							if($(this).parent().attr('id').split('_')[0] == click_p2){
								alert("You cannot move there");
								$('.checker-cell').removeClass('move-checker');
							}else{

								alert("You can move there");
							 
								$('.checker-cell[data-cell="'+click_data+'"]').empty();
								$(this).append(click_html);
								$('.checker-cell').removeClass('move-checker');
							}

						}else{
							alert("You cannot move there");
							$('.checker-cell').removeClass('move-checker');
						}
						

						
					}

				}else{
					$('.checker-cell').removeClass('move-checker');
					// highlight cell if clicked
					if(click_check != null){
						$(this).addClass('move-checker');
						click_p = $(this).parent().attr('id').split('_').pop();
						click_p2 = $(this).parent().attr('id').split('_')[0];
						click_data = $(this).attr('data-cell');
						click_html = $(this).html();
						console.log(click_p);
					}else{
						alert("There is no checker there");
					}
				}	
			});*/