function move_black(){
	$(document).on('click', '.checker-cell', function(){
		//check if there is a selcted cell
		if($('.checker-cell').hasClass('move-checker')){
			if (($(this).children('.black-checker').length != 0) || ($(this).hasClass('red'))) {
				alert('You cannot move here');
				$('.checker-cell').removeClass('move-checker');
			}else{
				second = $(this).parent();
				second_info = $(this).children('.checker').length;
				data_count2 = $(this).attr('data-count');
				row_id_2 = $(this).parent().attr('id');
				next_row_info_2  = $(this).parent().prev().children().children('.red-checker');
				next_row_each = $(this).parent().prev().children().children('.red-checker');

				
			
				if( second.is(row)){
					if(second_info == 0){
						if(row_id_first == 'odd'){
							if(data_count2 == data_count || data_count2 == eval(data_count) + eval(1) ){
								console.log("data count matches");

								$('.checker-cell[data-cell="'+move_cell+'"]').empty();
								$('.checker-cell[data-cell="'+move_cell+'"]').append(checker_move_numb);
								$(this).append(checker_move);
								$('.checker-cell').removeClass('move-checker');

							}else{
								console.log("data count doesnt match");
							}
						}else{
							if(data_count2 == data_count || data_count2 == eval(data_count) - eval(1) ){
								console.log("data count matches");

								$('.checker-cell[data-cell="'+move_cell+'"]').empty();
								$('.checker-cell[data-cell="'+move_cell+'"]').append(checker_move_numb);
								$(this).append(checker_move);
								$('.checker-cell').removeClass('move-checker');

							}else{
								console.log("data count doesnt match");
							}
						}
							

					}else{
						if($(this).children('.red-checker')){
							console.log('There is a red checker there');
						}else{
							console.log("There is a black-checker there");
						}

						
					}

				}else{
					if(next_row_info.length != 0){
						if(row_id_first == 'odd'){
							if (data_count2 == eval(data_count - data_count2) || data_count2 == eval(data_count) + eval(1)) {
								
								if( row_id_2 == row_id ){
									console.log("you cannot move in the same row")
								}else{
									if (next_row_info_2.length != 0) {

										console.log("odd...jump is valid... need to check next row");
										//jump row checker
										$('.cr').each(function(i){

											items_all = $(this).children().children('.checker');
											items_black = $(this).children().children('.black-checker');
											items_red = $(this).children().children('.red-checker');
											items_combo = $(this).children().children('.red-checker, .black-checker');
											if( items_red.length == 4){
												red_a = [];
												$.each(items_red, function(){
													reds = $(this).parent().attr('data-count');
													red_a.push(reds);
												});
												
											}else if( items_black.length == 4){
												black_a = [];
												$.each(items_black, function(){
													blacks = $(this).parent().attr('data-count');
													black_a.push(blacks);
												});
												
											}else if ( items_all.length == 0){
												
											}else{
												if(items_red.length == 0 && items_black.length < 4){
													black_s = [];
													$.each(items_black, function(){
														blacks = $(this).parent().attr('data-count');
														black_s.push(blacks);
													});
													
												}else if(items_black.length == 0 && items_red.length < 4 ){
													red_s = [];
													$.each(items_red, function(){
														reds = $(this).parent().attr('data-count');
														red_s.push(reds);
													});
													
												}else{
													red_c = [];
													$.each(items_red, function(){
														reds = $(this).parent().attr('data-count');
														red_c.push(reds);
													});
													black_c = [];
													$.each(items_black, function(){
														blacks = $(this).parent().attr('data-count');
														black_c.push(blacks);
													});

													
												}
											}									
										});
										
										this_each = $(this);
										$.each(next_row_info, function(){
											if( eval($(this).parent().attr('data-count') - 1) == data_count2 ){
												
												$('.checker-cell[data-cell="'+move_cell+'"]').empty();
												$('.checker-cell[data-cell="'+move_cell+'"]').append(checker_move_numb);
												this_each.append(checker_move);
												$('.checker-cell').removeClass('move-checker');

											}else if($(this).parent().attr('data-count') == data_count2 ){
												$('.checker-cell[data-cell="'+move_cell+'"]').empty();
												$('.checker-cell[data-cell="'+move_cell+'"]').append(checker_move_numb);
												this_each.append(checker_move);
												$('.checker-cell').removeClass('move-checker');
											}else{
												console.log("No red checker to jump.. not valid");
											}

										});
								
									}else{
										console.log("No more jumps can be done");
									}
									

								}

							}else{
								console.log("odd..jump is not valid");
							}
						}else{
							if (data_count2 == data_count || data_count2 == eval(data_count) - eval(1)) {
								if( row_id_2 == row_id ){
									console.log("you cannot move in the same row")
								}else{
									console.log("even...jump is valid");
								}
									
							}else{
								console.log("even..jump is not valid");
							}
						}
					}else{
						console.log("There is no red piece (jump possible) on next line");
					}
					
				}

			}
		// if no selected cell run this...
		}else{

			//needs to be black checker to select				
			if (( $(this).children('.checker').length != 0) && ( $(this).children('.black-checker').length != 0) )  {
				rows = $(this).parent().parent().children('.cr');
				next_row_info  = $(this).parent().prev().children().children('.red-checker');

				row  = $(this).parent().prev();
				row_id = $(this).parent().attr('id');
				row_id_first = $(this).parent().attr('id').split('_')[0];
				data_count= $(this).attr('data-count');
				checker_move = $(this).children('.black-checker').get(0).outerHTML;
				checker_move_numb = $(this).children('.move-count').get(0).outerHTML;
				move_cell = $(this).attr('data-cell');
				

	
				
				//highlight checker to move
				$(this).addClass('move-checker');
				//allow only 1 to be highlighted
				if ($('.checker-cell').hasClass('move-checker')) {

					$('.checker-cell').removeClass('move-checker');
					$(this).addClass('move-checker');

				}
				
			}else{
				alert("Select a black checker please")
			}


		}
		
		


	});	
}