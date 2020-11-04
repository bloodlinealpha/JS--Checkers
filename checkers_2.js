	$(document).ready(function(){

		//make even rows and odds rows
			for(i=0; i<4; i++){
				ii= eval(i+1);
				$('.checker-board').append('\
					<div id="even_'+ii+'" class="checker-rows-even cr"></div>\
					');
				$('.checker-board').append('\
					<div id="odd_'+ii+'" class="checker-rows-odd cr"></div>\
					');
			}
			

			counter=0;
			$('.checker-rows-even').each(function(){
				for(i=0; i<8; i++){
					counter++;
					$(this).append('<div data-cell="'+counter+'" class="checker-cell"></div>');
				}
			});

			counter_2=33;
			$('.checker-rows-odd').each(function(){
				for(i=0; i<8; i++){
					counter_2++;
					$(this).append('<div data-cell="'+counter_2+'" class="checker-cell"></div>');
				}
			});

			$('.checker-rows-even > div').each(function(i){
				cell = $(this).attr('data-cell');

				if(cell % 2 === 0){
					$(this).addClass('red');
				}else{
					$(this).addClass('black');
						if(cell <= 15 || cell >= 25){
							$(this).append('<div data-checker="'+i+'" class="checker"></div>');
						}
						
					
				}

			});
			$('.checker-rows-odd > div').each(function(i){
				cell = $(this).attr('data-cell');

				if(cell % 2 === 0){
					$(this).addClass('red');
				}else{
					$(this).addClass('black');
					if(cell >= 51 || cell <= 41 ){
							$(this).append('<div data-checker="'+i+'" class="checker"></div>');
						}
				
				}

			});

			$('.checker').each(function(){
				if($(this).attr('data-checker') <= 14){
					$(this).addClass('red-checker');
					//$(this).html('Red')
				}else if ($(this).attr('data-checker') > 14){
					$(this).addClass('black-checker');
					//$(this).html('Black');
				}
			});


			// add 1,2,3,4 to data-count
			$('.checker-rows-even').each(function(i){
				$(this).children('.black').each(function(p){
					pp =eval(p+1);
					$(this).attr('data-count', pp);
					//$(this).prepend('<div class="move-count"></div>');
				});
				
			});

			// add 1,2,3,4 to data-count
			$('.checker-rows-odd').each(function(i){
				$(this).children('.black').each(function(p){
					pp =eval(p+1);
					$(this).attr('data-count', pp);
					//$(this).prepend('<div class="move-count"></div>');
				});
				
			});
			$('.cr').each(function(p){
				pp =eval(p+1);
					$(this).attr('data-rows', pp);
			});



			//testing info

			//remove checker for testing
			/*$('.checker-cell').each(function(i){
				if($(this).attr('data-cell') == 1){
					$(this).empty();
				}
				if($(this).attr('data-cell') == 5){
					$(this).empty();
				}
				if($(this).attr('data-cell') == 39){
					$(this).empty();
				}
				if($(this).attr('data-cell') == 57){
					$(this).empty();
				}
			});*/


			//add a checker for testing
			/*$('.checker-cell').each(function(i){
				if($(this).attr('data-cell') == 21){
					$(this).append('<div data-checker="99" class="checker red-checker">Red</div>');
					$(this).append('<div class="move-count">3</div>');
				}
				if($(this).attr('data-cell') == 1){
					$(this).append('<div class="move-count">1</div>');
				}
				if($(this).attr('data-cell') == 5){
					$(this).append('<div class="move-count">3</div>');
				}
				if($(this).attr('data-cell') == 21){
					$(this).append('<div data-checker="101" class="checker black-checker">Black</div>');
				}
			});*/
			


		alert("Black goes first turn");

		//count checkers <------------------>
		checker_init = 12;
		red_checker_count = 0;
		$('.red-checker').each(function(i){
			red_checker_count++;
		});

		black_checker_count = 0;
		$('.black-checker').each(function(i){
			black_checker_count++;
		});

		$('#red_score').html(red_checker_count);
		$('#black_score').html(black_checker_count);
	// <------------------------------->

		var turn_black = true;
		var double_jump_active = false;
		$(document).on('click', '.checker-cell', function(){

//<---------black turn
			if (turn_black) {
				//count checkers
			//<----------------------------------->
				checker_init = 12;
				red_checker_count = 0;
				$('.red-checker').each(function(i){
					red_checker_count++;
				});

				black_checker_count = 0;
				$('.black-checker').each(function(i){
					black_checker_count++;
				});

				$('#red_score').html(red_checker_count);
				$('#black_score').html(black_checker_count);

				if( $('#red_score').html() == 0 ){
					alert("Black wins!... press the reset button to play again!!");
				}
				if( $('#black_score').html() == 0 ){
					alert("Red wins!... press the reset button to play again!!");
				}
			//<----------------------------------->


				

				if( $('.checker-cell').hasClass('move-checker') ){
					//get data-count clicked for the row
					move_row_count = $(this).parent().attr('data-rows');
					//get data for if a checker exists
					move_checker_conflict = $(this).children('.checker').length;
					//get cell data-count attribute
					move_checkercell_count = $(this).attr('data-count');
					//get data for red checkers for double jump
					move_row_count_double = $('.cr[data-rows="'+ eval(move_row_count - 2) +'"]').children().children('.red-checker').length;
					//console.log( 'move row -2 = '+ move_row_count_double);
					//get data cell for selcted for double jump
					move_cell = $(this).attr('data-cell');


					//check for king
					if(select_king_exist !=0){
						console.log('you selected a king');

						//black, red, and no checker in move area
						if (move_checker_conflict == 0 ) {
								//for next row empty
								if(move_row_count == eval(select_row_count) - 1 || move_row_count == eval(select_row_count) + 1){
									//if row is even
									if(select_row_count % 2 === 0){
										// if same or 1 cell can be moved to
										if( select_checkercell_count == move_checkercell_count || eval(move_checkercell_count - select_checkercell_count == 1) ){
											console.log("valid move");
										
											$('.checker-cell[data-cell="'+select_cell+'"]').empty();
											$(this).append(select_move);
											$('.checker-cell').removeClass('move-checker');
											$('.checker-cell').removeClass('move-double');
											double_jump_active = false;
											//update done counter
											//alert('Move completed');

											turn_black = false;
											
										}else{
											console.log("invalid move - pick ajoining cell");
										}
									//if row is odd
									}else{
										// if same or -1 can be moved to
										if( select_checkercell_count == move_checkercell_count || eval(move_checkercell_count - select_checkercell_count == -1) ){
											console.log("valid move");
											
											$('.checker-cell[data-cell="'+select_cell+'"]').empty();
											
											$(this).append(select_move);
											$('.checker-cell').removeClass('move-checker');
											$('.checker-cell').removeClass('move-double');
											double_jump_active = false;
											//update done counter
											//alert('Move completed');

											turn_black = false;
											
								
										}else{
											alert("invalid move - pick ajoining cell");
										}
									}
								}else{
									//check if next row contains red checkers
									if(select_row_next !=0 || select_row_next_king !=0){
										console.log("there are red checkers in next row");
									
										if( move_checkercell_count == eval(select_checkercell_count) - 1 ||  move_checkercell_count == eval(select_checkercell_count) + 1 ){
											console.log('valid cell to jump to');

											//find red checkers location
											reds = []
											$('.cr').each(function(i){
												each_red = $(this).children().children('.red-checker')
												$.each(each_red, function(p){
													row = $(this).parent().parent().attr('data-rows');
													red = $(this).parent().attr('data-count');
													red_data_cell = $(this).parent().attr('data-cell');
													reds.push({'row': row,
																'cell': red,
																'data_cell': red_data_cell});
												});
											});

											//find red checkers location
											rows = []
											$('.cr').each(function(i){
												each_checker = $(this).children('.black');
												$.each(each_checker, function(p){
													row = $(this).parent().attr('data-rows');
													checker = $(this).attr('data-count');
													checker_data_cell = $(this).children('.checker').length;
													rows.push({'row': row,
																'cell': checker,
																'checker_length': checker_data_cell});
												});
											});
											//get init $this
											this_this = $(this);
											//find red checker to jump
											jump_count = 0;
											$.each(reds, function(i, v){
												//if going down board 1 -----------> 8
												if( v.row == eval(select_row_count) - 1 ){
													// console.log('Red in: '+v.cell);
													//if row is even
													if(select_row_count % 2 === 0){
														//added jump can be 2 rows ahead only
														if(move_checkercell_count == v.cell && eval(move_checkercell_count) - 1 == select_checkercell_count && move_row_count == eval(select_row_count) - 2 ){
															jump_count++
															
															//move to black checker
															$('.checker-cell[data-cell="'+select_cell+'"]').empty();
															
															this_this.append(select_move);
															$('.checker-cell').removeClass('move-checker');
															//remove red checker
															$('.checker-cell[data-cell="'+v.data_cell+'"]').empty();
															
															//update done counter
															
															
															//even double jump
															if ( move_row_count_double == 4) {
																console.log("no double jump possible");
																$('.checker-cell').removeClass('move-checker');
																$('.checker-cell').removeClass('move-double');
																double_jump_active = false;
																//update done counter
																alert('Move completed');

																turn_black = false;
															}else{
																//for even
																double_next_left ="no";
																double_next_right ="no";
																$.each(reds, function(key,val){
																	if(val.row == eval(select_row_count) - 3){
																		
																		if( val.cell == move_checkercell_count ){
																			double_next_left = "yes"
																			console.log('left');
																		}
																		if( val.cell == eval(move_checkercell_count) + 1 ){
																			double_next_right = "yes"
																			console.log('right');
																		}	
																	}
																});
																double_jump = 0;
																if(double_next_left == "yes"){
																	$.each(rows, function(kk,vv){
																		if( vv.row == eval(select_row_count) - 4 ){
																			if (vv.checker_length == 0) {
																				if(move_row_count % 2 == 0){
																					if ( vv.cell == eval(move_checkercell_count) - 1 ) {
																						double_jump++;
																						console.log('you can double jump into cell: '+ vv.cell);
																						$('.checker-cell').removeClass('move-checker');
																						this_this.addClass('move-double');
																						double_jump_active = true;
																					}
																				}
																			}

																		}
																	});
																}

																if(double_next_right == "yes"){
																	$.each(rows, function(kk,vv){
																		if( vv.row == eval(select_row_count) - 4 ){
																			if (vv.checker_length == 0) {
																				if(move_row_count % 2 == 0){
																					if ( vv.cell == eval(move_checkercell_count) + 1 ) {
																						double_jump++;
																						console.log('you can double jump into cell: '+ vv.cell);
																						$('.checker-cell').removeClass('move-checker');
																						this_this.addClass('move-double');
																						double_jump_active = true;

																						
																						

																					}
																				}
																			}

																		}
																	});

																}
																if (double_next_right == "no" && double_next_left == "no"){
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	turn_black = false;
																}
																if(double_jump === 0){
																	console.log('no valid double jump..ending turn');
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	turn_black = false;
																}
																
															}
															
											
															return false;
															
														}
														if( eval(move_checkercell_count) + 1 == v.cell && eval(move_checkercell_count) + 1 == select_checkercell_count & move_row_count == eval(select_row_count) - 2){
															jump_count++

															//move to black checker
															$('.checker-cell[data-cell="'+select_cell+'"]').empty();
															
															this_this.append(select_move);
															$('.checker-cell').removeClass('move-checker');
															//remove red checker
															$('.checker-cell[data-cell="'+v.data_cell+'"]').empty();
															
															//update done counter
															
															
															//even double jump
															if ( move_row_count_double == 4) {
																console.log("no double jump possible");
																$('.checker-cell').removeClass('move-checker');
																$('.checker-cell').removeClass('move-double');
																double_jump_active = false;
																//update done counter
																alert('Move completed');

																turn_black = false;
															}else{
																//for even
																double_next_left ="no";
																double_next_right ="no";
																$.each(reds, function(key,val){
																	if(val.row == eval(select_row_count) - 3){
																		
																		if( val.cell == move_checkercell_count ){
																			double_next_left = "yes"
																			console.log('left');
																		}
																		if( val.cell == eval(move_checkercell_count) + 1 ){
																			double_next_right = "yes"
																			console.log('right');
																		}	
																	}
																});
																double_jump = 0;
																if(double_next_left == "yes"){
																	$.each(rows, function(kk,vv){
																		if( vv.row == eval(select_row_count) - 4 ){
																			if (vv.checker_length == 0) {
																				if(move_row_count % 2 == 0){
																					if ( vv.cell == eval(move_checkercell_count) - 1 ) {
																						double_jump++;
																						console.log('you can double jump into cell: '+ vv.cell);
																						$('.checker-cell').removeClass('move-checker');
																						this_this.addClass('move-double');
																						double_jump_active = true;
																					}
																				}
																			}

																		}
																	});
																}

																if(double_next_right == "yes"){
																	$.each(rows, function(kk,vv){
																		if( vv.row == eval(select_row_count) - 4 ){
																			if (vv.checker_length == 0) {
																				if(move_row_count % 2 == 0){
																					if ( vv.cell == eval(move_checkercell_count) + 1 ) {
																						double_jump++;
																						console.log('you can double jump into cell: '+ vv.cell);
																						$('.checker-cell').removeClass('move-checker');
																						this_this.addClass('move-double');
																						double_jump_active = true;

																						
																						

																					}
																				}
																			}

																		}
																	});

																}
																if (double_next_right == "no" && double_next_left == "no"){
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	turn_black = false;
																}
																if(double_jump === 0){
																	console.log('no valid double jump..ending turn');
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	turn_black = false;
																}
																
															}
														
															return false;
															

														}
													//if odd
													}else{
														
														if( move_checkercell_count == v.cell && eval(move_checkercell_count) + 1 == select_checkercell_count & move_row_count == eval(select_row_count) - 2 ){
															jump_count++

																//move to black checker
																$('.checker-cell[data-cell="'+select_cell+'"]').empty();
																
																this_this.append(select_move);
																$('.checker-cell').removeClass('move-checker');
																//remove red checker
																$('.checker-cell[data-cell="'+v.data_cell+'"]').empty();
																
																//update done counter
																
																
																//odd doubel jump
																if ( move_row_count_double == 4) {
																	console.log("no double jump possible");
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	//update done counter
																	//alert('Move completed');

																	turn_black = false;
																}else{
																	//for odd
																	double_next_left ="no";
																	double_next_right ="no";
																	$.each(reds, function(key,val){
																		if(val.row == eval(select_row_count) - 3){
																			
																			if( val.cell == eval(move_checkercell_count) - 1 ){
																				double_next_left = "yes"
																				console.log('left');
																			}
																			if(val.cell == move_checkercell_count ){
																				double_next_right = "yes"
																				console.log('right');
																			}	
																		}
																	});
																	double_jump = 0;
																	if(double_next_left == "yes"){
																		$.each(rows, function(kk,vv){
																			if( vv.row == eval(select_row_count) - 4 ){
																				if (vv.checker_length == 0) {
																					if(move_row_count % 2 != 0){
																						if ( vv.cell == eval(move_checkercell_count) - 1 ) {
																							double_jump++;
																							console.log('you can double jump into cell: '+ vv.cell);
																							$('.checker-cell').removeClass('move-checker');
																							this_this.addClass('move-double');
																							double_jump_active = true;
																						}
																					}
																				}

																			}
																		});
																	}

																	if(double_next_right == "yes"){
																		$.each(rows, function(kk,vv){
																			if( vv.row == eval(select_row_count) - 4 ){
																				if (vv.checker_length == 0) {
																					if(move_row_count % 2 != 0){
																						if ( vv.cell == eval(move_checkercell_count) + 1 ) {
																							double_jump++;
																							console.log('you can double jump into cell: '+ vv.cell);
																							$('.checker-cell').removeClass('move-checker');
																							this_this.addClass('move-double');
																							double_jump_active = true;

																							
																							

																						}
																					}
																				}

																			}
																		});

																	}
																	if (double_next_right == "no" && double_next_left == "no"){
																		$('.checker-cell').removeClass('move-checker');
																		$('.checker-cell').removeClass('move-double');
																		double_jump_active = false;
																		turn_black = false;
																	}
																	if(double_jump === 0){
																		console.log('no valid double jump..ending turn');
																		$('.checker-cell').removeClass('move-checker');
																		$('.checker-cell').removeClass('move-double');
																		double_jump_active = false;
																		turn_black = false;
																	}
																}
															
																
																return false;
															
														}
														if( eval(move_checkercell_count) - 1 == v.cell && eval(move_checkercell_count) - 1 == select_checkercell_count & move_row_count == eval(select_row_count) - 2 ){
															jump_count++

															//move to black checker
															$('.checker-cell[data-cell="'+select_cell+'"]').empty();
															
															this_this.append(select_move);
															$('.checker-cell').removeClass('move-checker');
															//remove red checker
															$('.checker-cell[data-cell="'+v.data_cell+'"]').empty();
															
															//update done counter
															
															
															//odd double jump
															if ( move_row_count_double == 4) {
																console.log("no double jump possible");
																$('.checker-cell').removeClass('move-checker');
																$('.checker-cell').removeClass('move-double');
																double_jump_active = false;
																//update done counter
																//alert('Move completed');

																turn_black = false;
															}else{
																//for odd
																double_next_left ="no";
																double_next_right ="no";
																$.each(reds, function(key,val){
																	if(val.row == eval(select_row_count) - 3){
																		
																		if( val.cell == eval(move_checkercell_count) - 1 ){
																			double_next_left = "yes"
																			console.log('left');
																		}
																		if(val.cell == move_checkercell_count ){
																			double_next_right = "yes"
																			console.log('right');
																		}	
																	}
																});
																double_jump = 0;
																if(double_next_left == "yes"){
																	$.each(rows, function(kk,vv){
																		if( vv.row == eval(select_row_count) - 4 ){
																			if (vv.checker_length == 0) {
																				if(move_row_count % 2 != 0){
																					if ( vv.cell == eval(move_checkercell_count) - 1 ) {
																						double_jump++;
																						console.log('you can double jump into cell: '+ vv.cell);
																						$('.checker-cell').removeClass('move-checker');
																						this_this.addClass('move-double');
																						double_jump_active = true;
																					}
																				}
																			}

																		}
																	});
																}

																if(double_next_right == "yes"){
																	$.each(rows, function(kk,vv){
																		if( vv.row == eval(select_row_count) - 4 ){
																			if (vv.checker_length == 0) {
																				if(move_row_count % 2 != 0){
																					if ( vv.cell == eval(move_checkercell_count) + 1 ) {
																						double_jump++;
																						console.log('you can double jump into cell: '+ vv.cell);
																						$('.checker-cell').removeClass('move-checker');
																						this_this.addClass('move-double');
																						double_jump_active = true;

																						
																						

																					}
																				}
																			}

																		}
																	});

																}
																if (double_next_right == "no" && double_next_left == "no"){
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	turn_black = false;
																}
																if(double_jump === 0){
																	console.log('no valid double jump..ending turn');
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	turn_black = false;
																}
															}
														
															return false;
															

														}

													}
												//if going up board 1----------------->8
												}else if ( v.row == eval(select_row_count) + 1){

													// console.log('Red in: '+v.cell);
													//if row is even
													if(select_row_count % 2 === 0){
														//added jump can be 2 rows ahead only
														if(move_checkercell_count == v.cell && eval(move_checkercell_count) - 1 == select_checkercell_count && move_row_count == eval(select_row_count) + 2 ){
															jump_count++
															
															//move to black checker
															$('.checker-cell[data-cell="'+select_cell+'"]').empty();
															
															this_this.append(select_move);
															$('.checker-cell').removeClass('move-checker');
															//remove red checker
															$('.checker-cell[data-cell="'+v.data_cell+'"]').empty();
															
															//update done counter
															
															
															//even double jump
															if ( move_row_count_double == 4) {
																console.log("no double jump possible");
																$('.checker-cell').removeClass('move-checker');
																$('.checker-cell').removeClass('move-double');
																double_jump_active = false;
																//update done counter
																alert('Move completed');

																turn_black = false;
															}else{
																//for even
																double_next_left ="no";
																double_next_right ="no";
																$.each(reds, function(key,val){
																	if(val.row == eval(select_row_count) + 3){
																		
																		if( val.cell == move_checkercell_count ){
																			double_next_left = "yes"
																			console.log('left');
																		}
																		if( val.cell == eval(move_checkercell_count) + 1 ){
																			double_next_right = "yes"
																			console.log('right');
																		}	
																	}
																});
																double_jump = 0;
																if(double_next_left == "yes"){
																	$.each(rows, function(kk,vv){
																		if( vv.row == eval(select_row_count) + 4 ){
																			if (vv.checker_length == 0) {
																				if(move_row_count % 2 == 0){
																					if ( vv.cell == eval(move_checkercell_count) - 1 ) {
																						double_jump++;
																						console.log('you can double jump into cell: '+ vv.cell);
																						$('.checker-cell').removeClass('move-checker');
																						this_this.addClass('move-double');
																						double_jump_active = true;
																					}
																				}
																			}

																		}
																	});
																}

																if(double_next_right == "yes"){
																	$.each(rows, function(kk,vv){
																		if( vv.row == eval(select_row_count) + 4 ){
																			if (vv.checker_length == 0) {
																				if(move_row_count % 2 == 0){
																					if ( vv.cell == eval(move_checkercell_count) + 1 ) {
																						double_jump++;
																						console.log('you can double jump into cell: '+ vv.cell);
																						$('.checker-cell').removeClass('move-checker');
																						this_this.addClass('move-double');
																						double_jump_active = true;

																						
																						

																					}
																				}
																			}

																		}
																	});

																}
																if (double_next_right == "no" && double_next_left == "no"){
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	turn_black = false;
																}
																if(double_jump === 0){
																	console.log('no valid double jump..ending turn');
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	turn_black = false;
																}
																
															}
											
															return false;
															
														}
														if( eval(move_checkercell_count) + 1 == v.cell && eval(move_checkercell_count) + 1 == select_checkercell_count & move_row_count == eval(select_row_count) + 2){
															jump_count++

															//move to black checker
															$('.checker-cell[data-cell="'+select_cell+'"]').empty();
															
															this_this.append(select_move);
															$('.checker-cell').removeClass('move-checker');
															//remove red checker
															$('.checker-cell[data-cell="'+v.data_cell+'"]').empty();
															
															//update done counter
															
															
															//even double jump
															if ( move_row_count_double == 4) {
																console.log("no double jump possible");
																$('.checker-cell').removeClass('move-checker');
																$('.checker-cell').removeClass('move-double');
																double_jump_active = false;
																//update done counter
																alert('Move completed');

																turn_black = false;
															}else{
																//for even
																double_next_left ="no";
																double_next_right ="no";
																$.each(reds, function(key,val){
																	if(val.row == eval(select_row_count) + 3){
																		
																		if( val.cell == move_checkercell_count ){
																			double_next_left = "yes"
																			console.log('left');
																		}
																		if( val.cell == eval(move_checkercell_count) + 1 ){
																			double_next_right = "yes"
																			console.log('right');
																		}	
																	}
																});
																double_jump = 0;
																if(double_next_left == "yes"){
																	$.each(rows, function(kk,vv){
																		if( vv.row == eval(select_row_count) + 4 ){
																			if (vv.checker_length == 0) {
																				if(move_row_count % 2 == 0){
																					if ( vv.cell == eval(move_checkercell_count) - 1 ) {
																						double_jump++;
																						console.log('you can double jump into cell: '+ vv.cell);
																						$('.checker-cell').removeClass('move-checker');
																						this_this.addClass('move-double');
																						double_jump_active = true;
																					}
																				}
																			}

																		}
																	});
																}

																if(double_next_right == "yes"){
																	$.each(rows, function(kk,vv){
																		if( vv.row == eval(select_row_count) + 4 ){
																			if (vv.checker_length == 0) {
																				if(move_row_count % 2 == 0){
																					if ( vv.cell == eval(move_checkercell_count) + 1 ) {
																						double_jump++;
																						console.log('you can double jump into cell: '+ vv.cell);
																						$('.checker-cell').removeClass('move-checker');
																						this_this.addClass('move-double');
																						double_jump_active = true;

																						
																						

																					}
																				}
																			}

																		}
																	});

																}
																if (double_next_right == "no" && double_next_left == "no"){
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	turn_black = false;
																}
																if(double_jump === 0){
																	console.log('no valid double jump..ending turn');
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	turn_black = false;
																}
																
															}
														
															return false;
															
														}
													//if odd
													}else{
														
														if( move_checkercell_count == v.cell && eval(move_checkercell_count) + 1 == select_checkercell_count & move_row_count == eval(select_row_count) + 2 ){
															jump_count++

															//move to black checker
															$('.checker-cell[data-cell="'+select_cell+'"]').empty();
															
															this_this.append(select_move);
															$('.checker-cell').removeClass('move-checker');
															//remove red checker
															$('.checker-cell[data-cell="'+v.data_cell+'"]').empty();
															
															//update done counter
															
															
															//odd double jump
															if ( move_row_count_double == 4) {
																console.log("no double jump possible");
																$('.checker-cell').removeClass('move-checker');
																$('.checker-cell').removeClass('move-double');
																double_jump_active = false;
																//update done counter
																//alert('Move completed');

																turn_black = false;
															}else{
																//for odd
																double_next_left ="no";
																double_next_right ="no";
																$.each(reds, function(key,val){
																	if(val.row == eval(select_row_count) + 3){
																		
																		if( val.cell == eval(move_checkercell_count) - 1 ){
																			double_next_left = "yes"
																			console.log('left');
																		}
																		if(val.cell == move_checkercell_count ){
																			double_next_right = "yes"
																			console.log('right');
																		}	
																	}
																});
																double_jump = 0;
																if(double_next_left == "yes"){
																	$.each(rows, function(kk,vv){
																		if( vv.row == eval(select_row_count) + 4 ){
																			if (vv.checker_length == 0) {
																				if(move_row_count % 2 != 0){
																					if ( vv.cell == eval(move_checkercell_count) - 1 ) {
																						double_jump++;
																						console.log('you can double jump into cell: '+ vv.cell);
																						$('.checker-cell').removeClass('move-checker');
																						this_this.addClass('move-double');
																						double_jump_active = true;
																					}
																				}
																			}

																		}
																	});
																}

																if(double_next_right == "yes"){
																	$.each(rows, function(kk,vv){
																		if( vv.row == eval(select_row_count) + 4 ){
																			if (vv.checker_length == 0) {
																				if(move_row_count % 2 != 0){
																					if ( vv.cell == eval(move_checkercell_count) + 1 ) {
																						double_jump++;
																						console.log('you can double jump into cell: '+ vv.cell);
																						$('.checker-cell').removeClass('move-checker');
																						this_this.addClass('move-double');
																						double_jump_active = true;

																						
																						

																					}
																				}
																			}

																		}
																	});

																}
																if (double_next_right == "no" && double_next_left == "no"){
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	turn_black = false;
																}
																if(double_jump === 0){
																	console.log('no valid double jump..ending turn');
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	turn_black = false;
																}
															}
														
															
															return false;
															
														}
														if( eval(move_checkercell_count) - 1 == v.cell && eval(move_checkercell_count) - 1 == select_checkercell_count & move_row_count == eval(select_row_count) + 2 ){
															jump_count++

															//move to black checker
															$('.checker-cell[data-cell="'+select_cell+'"]').empty();
															
															this_this.append(select_move);
															$('.checker-cell').removeClass('move-checker');
															//remove red checker
															$('.checker-cell[data-cell="'+v.data_cell+'"]').empty();
															
															//update done counter
															
															
															//odd doubel jump
															if ( move_row_count_double == 4) {
																console.log("no double jump possible");
																$('.checker-cell').removeClass('move-checker');
																$('.checker-cell').removeClass('move-double');
																double_jump_active = false;
																//update done counter
																//alert('Move completed');

																turn_black = false;
															}else{
																//for odd
																double_next_left ="no";
																double_next_right ="no";
																$.each(reds, function(key,val){
																	if(val.row == eval(select_row_count) + 3){
																		
																		if( val.cell == eval(move_checkercell_count) - 1 ){
																			double_next_left = "yes"
																			console.log('left');
																		}
																		if(val.cell == move_checkercell_count ){
																			double_next_right = "yes"
																			console.log('right');
																		}	
																	}
																});
																double_jump = 0;
																if(double_next_left == "yes"){
																	$.each(rows, function(kk,vv){
																		if( vv.row == eval(select_row_count) + 4 ){
																			if (vv.checker_length == 0) {
																				if(move_row_count % 2 != 0){
																					if ( vv.cell == eval(move_checkercell_count) - 1 ) {
																						double_jump++;
																						console.log('you can double jump into cell: '+ vv.cell);
																						$('.checker-cell').removeClass('move-checker');
																						this_this.addClass('move-double');
																						double_jump_active = true;
																					}
																				}
																			}

																		}
																	});
																}

																if(double_next_right == "yes"){
																	$.each(rows, function(kk,vv){
																		if( vv.row == eval(select_row_count) + 4 ){
																			if (vv.checker_length == 0) {
																				if(move_row_count % 2 != 0){
																					if ( vv.cell == eval(move_checkercell_count) + 1 ) {
																						double_jump++;
																						console.log('you can double jump into cell: '+ vv.cell);
																						$('.checker-cell').removeClass('move-checker');
																						this_this.addClass('move-double');
																						double_jump_active = true;

																						
																						

																					}
																				}
																			}

																		}
																	});

																}
																if (double_next_right == "no" && double_next_left == "no"){
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	turn_black = false;
																}
																if(double_jump === 0){
																	console.log('no valid double jump..ending turn');
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	turn_black = false;
																}
															}
														
															return false;
															

														}

													}
												}
											});
											// if no checker to jump...
											if(jump_count === 0){
												alert('invalid - nothing to jump');
											}

										}else{
											alert('invalid jump position');
										}

									}else{
										alert("invalid - You cannot move to that row");
									}
									
								}

						// if length is not 0 = checker in cell
						}else{
							alert("invalid move - there is already checker there");
						}


					}else{
					console.log('non king selected');
					//make sure moving up the board -- change for red checkers
						if (move_row_count < select_row_count) {
							
							//black, red, and no checker in move area
							if (move_checker_conflict == 0 ) {
									//for next row empty... no jump possible

									if(move_row_count == eval(select_row_count) - 1){
										//if row is even
										if(select_row_count % 2 === 0){
											// if same or 1 cell can be moved to
											if( select_checkercell_count == move_checkercell_count || eval(move_checkercell_count - select_checkercell_count == 1) ){
												console.log("valid move");
												
												if(move_row_count == 1){
													
													//change to k and add black king class
													$('.checker-cell[data-cell="'+select_cell+'"]').empty();
													
													$(this).append(select_move);
													$(this).children('.black-checker').addClass('black-king');
													
									
													$('.checker-cell').removeClass('move-checker');
													$('.checker-cell').removeClass('move-double');
													double_jump_active = false;
													//update done counter
													//alert('Move completed');

													turn_black = false;
												}else{
												
													$('.checker-cell[data-cell="'+select_cell+'"]').empty();
													
													$(this).append(select_move);
													$('.checker-cell').removeClass('move-checker');
													$('.checker-cell').removeClass('move-double');
													double_jump_active = false;
													//update done counter
													//alert('Move completed');

													turn_black = false;
												}
													
											}else{
												console.log("invalid move - pick ajoining cell");
											}
										//if row is odd
										}else{
											// if same or -1 can be moved to
											if( select_checkercell_count == move_checkercell_count || eval(move_checkercell_count - select_checkercell_count == -1) ){
												console.log("valid move");
												if(move_row_count == 1){
													
													//change to k and add black king class
													$('.checker-cell[data-cell="'+select_cell+'"]').empty();
													
													$(this).append(select_move);
													$(this).children('.black-checker').addClass('black-king');
													
									
													$('.checker-cell').removeClass('move-checker');
													$('.checker-cell').removeClass('move-double');
													double_jump_active = false;
													//update done counter
													//alert('Move completed');

													turn_black = false;
												}else{
													$('.checker-cell[data-cell="'+select_cell+'"]').empty();
													
													$(this).append(select_move);
													$('.checker-cell').removeClass('move-checker');
													$('.checker-cell').removeClass('move-double');
													double_jump_active = false;
													//update done counter
													//alert('Move completed');

													turn_black = false;
												}
											
											}else{
												alert("invalid move - pick ajoining cell");
											}
										}
									//For a jump	
									}else{
										//check if next row contains red checkers
										if(select_row_next !=0){
											console.log("there are red checkers in next row");

											if( move_checkercell_count == eval(select_checkercell_count) - 1 ||  move_checkercell_count == eval(select_checkercell_count) + 1 ){
												console.log('valid cell to jump to');

												//find red checkers location
												reds = []
												$('.cr').each(function(i){
													each_red = $(this).children().children('.red-checker')
													$.each(each_red, function(p){
														row = $(this).parent().parent().attr('data-rows');
														red = $(this).parent().attr('data-count');
														red_data_cell = $(this).parent().attr('data-cell');
														reds.push({'row': row,
																	'cell': red,
																	'data_cell': red_data_cell});
													});
												});
												//find red checkers location
												rows = []
												$('.cr').each(function(i){
													each_checker = $(this).children('.black');
													$.each(each_checker, function(p){
														row = $(this).parent().attr('data-rows');
														checker = $(this).attr('data-count');
														checker_data_cell = $(this).children('.checker').length;
														rows.push({'row': row,
																	'cell': checker,
																	'checker_length': checker_data_cell});
													});
												});

												//get init $this
												this_this = $(this);
												//find red checker to jump
												jump_count = 0;
												$.each(reds, function(i, v){
													if( v.row == eval(select_row_count) - 1 ){
														// console.log('Red in: '+v.cell);
														//if row is even
														if(select_row_count % 2 === 0){
															//added jump can be 2 rows ahead only
															if(move_checkercell_count == v.cell && eval(move_checkercell_count) - 1 == select_checkercell_count && move_row_count == eval(select_row_count) - 2 ){
																jump_count++
																
																//if king
																if(move_row_count == 1){
													
																	//change to k and add black king class
																	$('.checker-cell[data-cell="'+select_cell+'"]').empty();
																	
																	this_this.append(select_move);
																	this_this.children('.black-checker').addClass('black-king');
																	
																	//remove red checker
																	$('.checker-cell[data-cell="'+v.data_cell+'"]').empty();
																	
														
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	//update done counter
																	//alert('Move completed');

																	turn_black = false;
					
																}else{
																	//move to black checker
																	$('.checker-cell[data-cell="'+select_cell+'"]').empty();
																	
																	this_this.append(select_move);
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	//remove red checker
																	$('.checker-cell[data-cell="'+v.data_cell+'"]').empty();
																	

																	//even double jump
																	if ( move_row_count_double == 4) {
																		console.log("no double jump possible");
																		$('.checker-cell').removeClass('move-checker');
																		$('.checker-cell').removeClass('move-double');
																		double_jump_active = false;
																		//update done counter
																		alert('Move completed');

																		turn_black = false;
																	}else{
																		//for even
																		double_next_left ="no";
																		double_next_right ="no";
																		$.each(reds, function(key,val){
																			if(val.row == eval(select_row_count) - 3){
																				
																				if( val.cell == move_checkercell_count ){
																					double_next_left = "yes"
																					console.log('left');
																				}
																				if( val.cell == eval(move_checkercell_count) + 1 ){
																					double_next_right = "yes"
																					console.log('right');
																				}	
																			}
																		});
																		double_jump = 0;
																		if(double_next_left == "yes"){
																			$.each(rows, function(kk,vv){
																				if( vv.row == eval(select_row_count) - 4 ){
																					if (vv.checker_length == 0) {
																						if(move_row_count % 2 == 0){
																							if ( vv.cell == eval(move_checkercell_count) - 1 ) {
																								double_jump++;
																								console.log('you can double jump into cell: '+ vv.cell);
																								$('.checker-cell').removeClass('move-checker');
																								this_this.addClass('move-double');
																								double_jump_active = true;
																							}
																						}
																					}

																				}
																			});
																		}

																		if(double_next_right == "yes"){
																			$.each(rows, function(kk,vv){
																				if( vv.row == eval(select_row_count) - 4 ){
																					if (vv.checker_length == 0) {
																						if(move_row_count % 2 == 0){
																							if ( vv.cell == eval(move_checkercell_count) + 1 ) {
																								double_jump++;
																								console.log('you can double jump into cell: '+ vv.cell);
																								$('.checker-cell').removeClass('move-checker');
																								this_this.addClass('move-double');
																								double_jump_active = true;

																								
																								

																							}
																						}
																					}

																				}
																			});
	
																		}
																		if (double_next_right == "no" && double_next_left == "no"){
																			$('.checker-cell').removeClass('move-checker');
																			$('.checker-cell').removeClass('move-double');
																			double_jump_active = false;
																			turn_black = false;
																		}
																		if(double_jump === 0){
																			console.log('no valid double jump..ending turn');
																			$('.checker-cell').removeClass('move-checker');
																			$('.checker-cell').removeClass('move-double');
																			double_jump_active = false;
																			turn_black = false;
																		}
																		
																	}
																	
													
																	return false;
																}
															}
															if( eval(move_checkercell_count) + 1 == v.cell && eval(move_checkercell_count) + 1 == select_checkercell_count &&move_row_count == eval(select_row_count) - 2){
																jump_count++

																if(move_row_count == 1){
													
																	//change to k and add black king class
																	$('.checker-cell[data-cell="'+select_cell+'"]').empty();
																	
																	this_this.append(select_move);
																	this_this.children('.black-checker').addClass('black-king');
																	
																	//remove red checker
																	$('.checker-cell[data-cell="'+v.data_cell+'"]').empty();
																	
											
																	console.log("no double jump possible");
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	//update done counter
																	//alert('Move completed');

																	turn_black = false;
																	
																}else{
																	//move to black checker
																	$('.checker-cell[data-cell="'+select_cell+'"]').empty();
																	
																	this_this.append(select_move);
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	//remove red checker
																	$('.checker-cell[data-cell="'+v.data_cell+'"]').empty();
																	

																	if ( move_row_count_double == 4) {
																		console.log("no double jump possible");
																		$('.checker-cell').removeClass('move-checker');
																		$('.checker-cell').removeClass('move-double');
																		double_jump_active = false;
																		//update done counter
																		//alert('Move completed');

																		turn_black = false;
																	}else{

																		//for even
																		double_next_left ="no";
																		double_next_right ="no";
																		$.each(reds, function(key,val){
																			if(val.row == eval(select_row_count) - 3){
																				
																				if( val.cell == move_checkercell_count ){
																					double_next_left = "yes"
																					console.log('left');
																				}
																				if( val.cell == eval(move_checkercell_count) + 1 ){
																					double_next_right = "yes"
																					console.log('right');
																				}	
																			}
																		});
																		double_jump = 0;
																		if(double_next_left == "yes"){
																			$.each(rows, function(kk,vv){
																				if( vv.row == eval(select_row_count) - 4 ){
																					if (vv.checker_length == 0) {
																						if(move_row_count % 2 == 0){
																							if ( vv.cell == eval(move_checkercell_count) - 1 ) {
																								double_jump++;
																								console.log('you can double jump into cell: '+ vv.cell);
																								$('.checker-cell').removeClass('move-checker');
																								this_this.addClass('move-double');
																								double_jump_active = true;
																							}
																						}
																					}

																				}
																			});
																		}

																		if(double_next_right == "yes"){
																			$.each(rows, function(kk,vv){
																				if( vv.row == eval(select_row_count) - 4 ){
																					if (vv.checker_length == 0) {
																						if(move_row_count % 2 == 0){
																							if ( vv.cell == eval(move_checkercell_count) + 1 ) {
																								double_jump++;
																								console.log('you can double jump into cell: '+ vv.cell);
																								$('.checker-cell').removeClass('move-checker');
																								this_this.addClass('move-double');
																								double_jump_active = true;

																								
																								

																							}
																						}
																					}

																				}
																			});
	
																		}
																		if (double_next_right == "no" && double_next_left == "no"){
																			$('.checker-cell').removeClass('move-checker');
																			$('.checker-cell').removeClass('move-double');
																			double_jump_active = false;
																			turn_black = false;
																		}
																		if(double_jump === 0){
																			console.log('no valid double jump..ending turn');
																			$('.checker-cell').removeClass('move-checker');
																			$('.checker-cell').removeClass('move-double');
																			double_jump_active = false;
																			turn_black = false;
																		}
																		
																	
																	}
																	
																	return false;
																}

															}
														//if odd
														}else{
															
															if( move_checkercell_count == v.cell && eval(move_checkercell_count) + 1 == select_checkercell_count && move_row_count == eval(select_row_count) - 2 ){
																jump_count++

																if(move_row_count == 1){
													
																	//change to k and add black king class
																	$('.checker-cell[data-cell="'+select_cell+'"]').empty();
																	
																	this_this.append(select_move);
																	this_this.children('.black-checker').addClass('black-king');
																	
																	//remove red checker
																	$('.checker-cell[data-cell="'+v.data_cell+'"]').empty();
																	
													
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	//update done counter
																	//alert('Move completed');

																	turn_black = false;
																	
																}else{
																	//move to black checker
																	$('.checker-cell[data-cell="'+select_cell+'"]').empty();
																	
																	this_this.append(select_move);
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	//remove red checker
																	$('.checker-cell[data-cell="'+v.data_cell+'"]').empty();
																	
																	 console.log(move_row_count_double);

																	//odd doubel jump
																	if ( move_row_count_double == 4) {
																		console.log("no double jump possible");
																		$('.checker-cell').removeClass('move-checker');
																		$('.checker-cell').removeClass('move-double');
																		double_jump_active = false;
																		//update done counter
																		//alert('Move completed');

																		turn_black = false;
																	}else{
																		//for odd
																		double_next_left ="no";
																		double_next_right ="no";
																		$.each(reds, function(key,val){
																			if(val.row == eval(select_row_count) - 3){
																				
																				if( val.cell == eval(move_checkercell_count) - 1 ){
																					double_next_left = "yes"
																					console.log('left');
																				}
																				if(val.cell == move_checkercell_count ){
																					double_next_right = "yes"
																					console.log('right');
																				}	
																			}
																		});
																		double_jump = 0;
																		if(double_next_left == "yes"){
																			$.each(rows, function(kk,vv){
																				if( vv.row == eval(select_row_count) - 4 ){
																					if (vv.checker_length == 0) {
																						if(move_row_count % 2 != 0){
																							if ( vv.cell == eval(move_checkercell_count) - 1 ) {
																								double_jump++;
																								console.log('you can double jump into cell: '+ vv.cell);
																								$('.checker-cell').removeClass('move-checker');
																								this_this.addClass('move-double');
																								double_jump_active = true;
																							}
																						}
																					}

																				}
																			});
																		}

																		if(double_next_right == "yes"){
																			$.each(rows, function(kk,vv){
																				if( vv.row == eval(select_row_count) - 4 ){
																					if (vv.checker_length == 0) {
																						if(move_row_count % 2 != 0){
																							if ( vv.cell == eval(move_checkercell_count) + 1 ) {
																								double_jump++;
																								console.log('you can double jump into cell: '+ vv.cell);
																								$('.checker-cell').removeClass('move-checker');
																								this_this.addClass('move-double');
																								double_jump_active = true;

																								
																								

																							}
																						}
																					}

																				}
																			});
	
																		}
																		if (double_next_right == "no" && double_next_left == "no"){
																			$('.checker-cell').removeClass('move-checker');
																			$('.checker-cell').removeClass('move-double');
																			double_jump_active = false;
																			turn_black = false;
																		}
																		if(double_jump === 0){
																			console.log('no valid double jump..ending turn');
																			$('.checker-cell').removeClass('move-checker');
																			$('.checker-cell').removeClass('move-double');
																			double_jump_active = false;
																			turn_black = false;
																		}
																	}
																
																	
																	return false;
																}
															}
															if( eval(move_checkercell_count) - 1 == v.cell && eval(move_checkercell_count) - 1 == select_checkercell_count && move_row_count == eval(select_row_count) - 2 ){
																jump_count++

																if(move_row_count == 1){
													
																	//change to k and add black king class
																	$('.checker-cell[data-cell="'+select_cell+'"]').empty();
																	
																	this_this.append(select_move);
																	this_this.children('.black-checker').addClass('black-king');
																	
																	//remove red checker
																	$('.checker-cell[data-cell="'+v.data_cell+'"]').empty();
																	
													
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	//update done counter
																	//alert('Move completed');

																	turn_black = false;
																	
																}else{
																	//move to black checker
																	$('.checker-cell[data-cell="'+select_cell+'"]').empty();
																	
																	this_this.append(select_move);
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	//remove red checker
																	$('.checker-cell[data-cell="'+v.data_cell+'"]').empty();
																	

																	if ( move_row_count_double == 4) {
																		console.log("no double jump possible");
																		$('.checker-cell').removeClass('move-checker');
																		$('.checker-cell').removeClass('move-double');
																		double_jump_active = false;
																		//update done counter
																		//alert('Move completed');

																		turn_black = false;
																	}else{
																		//for odd
																		double_next_left ="no";
																		double_next_right ="no";
																		$.each(reds, function(key,val){
																			if(val.row == eval(select_row_count) - 3){
																				
																				if( val.cell == eval(move_checkercell_count) - 1 ){
																					double_next_left = "yes"
																					console.log('left');
																				}
																				if(val.cell == move_checkercell_count ){
																					double_next_right = "yes"
																					console.log('right');
																				}	
																			}
																		});
																		double_jump = 0;
																		if(double_next_left == "yes"){
																			$.each(rows, function(kk,vv){
																				if( vv.row == eval(select_row_count) - 4 ){
																					if (vv.checker_length == 0) {
																						if(move_row_count % 2 != 0){
																							if ( vv.cell == eval(move_checkercell_count) - 1 ) {
																								double_jump++;
																								console.log('you can double jump into cell: '+ vv.cell);
																								$('.checker-cell').removeClass('move-checker');
																								this_this.addClass('move-double');
																								double_jump_active = true;
																								
																							}
																						}
																					}

																				}
																			});
																		}

																		if(double_next_right == "yes"){
																			$.each(rows, function(kk,vv){
																				if( vv.row == eval(select_row_count) - 4 ){
																					if (vv.checker_length == 0) {
																						if(move_row_count % 2 != 0){
																							if ( vv.cell == eval(move_checkercell_count) + 1 ) {
																								double_jump++;
																								console.log('you can double jump into cell: '+ vv.cell);
																								$('.checker-cell').removeClass('move-checker');
																								this_this.addClass('move-double');
																								double_jump_active = true;
																								

																							}
																						}
																					}

																				}
																			});
	
																		}
																		if (double_next_right == "no" && double_next_left == "no"){
																			$('.checker-cell').removeClass('move-checker');
																			$('.checker-cell').removeClass('move-double');
																			double_jump_active = false;
																			turn_black = false;
																		}
																		if(double_jump === 0){
																			console.log('no valid double jump..ending turn');
																			$('.checker-cell').removeClass('move-checker');
																			$('.checker-cell').removeClass('move-double');
																			double_jump_active = false;
																			turn_black = false;
																		}
																		
																	}
																
																	return false;
																}

															}

														}
														
													}
												});
												// if no checker to jump...
												if(jump_count === 0){
													alert('invalid - nothing to jump');
												}

											}else{
												alert('invalid jump position');
											}

										}else{
											alert("invalid - You cannot move to that row");
										}
										
									}

							// if length is not 0 = checker in cell
							}else{
								alert("invalid move - there is already checker there");
							}
						}else{
							//black, red, and no checker to side or behind
							if (move_checker_conflict != 0 ) {
								alert("invalid move - there is already checker there + you must move forward! B");
								$('.checker-cell').removeClass('move-checker');
							}else{
								alert("invalid move - you must move forward!");
								$('.checker-cell').removeClass('move-checker');
							}
							
						}
					}

				}else{
					//needs to be black checker to select				
					if (( $(this).children('.checker').length != 0) && ( $(this).children('.black-checker').length != 0) )  {	
						
						if(double_jump_active){
							console.log("double jump = active");
							if( $(this).is('.move-double')){
								$(this).addClass('move-checker');
							}else{
								alert('please click on green cell to double jump!');
							}
						}else{
							//highlight checker to move
							$(this).addClass('move-checker');
						}

						//info about cell selected:
						select_row_count = $(this).parent().attr('data-rows');
						select_row_next = $('[data-rows="'+eval(select_row_count-1)+'"]').children().children('.red-checker').length;
						select_checkercell_count = $(this).attr('data-count');
						/*select_row = $(this).parent().attr('id');
						select_checker = $(this).children('.checker').attr('data-checker');*/

						//info to move selected checker
						select_move = $(this).children('.black-checker').get(0).outerHTML;
						/*//used for testing
						select_move_number = $(this).children('.move-count').get(0).outerHTML;*/
						
						select_cell = $(this).attr('data-cell');
						//get king data
						select_king_exist = $(this).children('.black-king').length;
						select_row_next_king = $('[data-rows="'+ (eval(select_row_count) + 1) +'"]').children().children('.red-checker').length;
					
						//allow only 1 to be highlighted
						if ($('.checker-cell').hasClass('move-checker')) {

							$('.checker-cell').removeClass('move-checker');

							if(double_jump_active){
								console.log("double jump = active");
								if( $(this).is('.move-double')){
									$(this).addClass('move-checker');
								}else{
									alert('please click on green cell to double jump!');
								}
							}else{
								//highlight checker to move
								$(this).addClass('move-checker');
							}
							

						}
						
					}else{
						alert("Invalid...Select a black checker please")
					}
				}


//<---------red turn
			}else{
				//count checkers <------------------>
					checker_init = 12;
					red_checker_count = 0;
					$('.red-checker').each(function(i){
						red_checker_count++;
					});

					black_checker_count = 0;
					$('.black-checker').each(function(i){
						black_checker_count++;
					});

					$('#red_score').html(red_checker_count);
					$('#black_score').html(black_checker_count);
					
					if( $('#red_score').html() == 0 ){
					alert("Black wins!... press the reset button to play again!!");
					}
					if( $('#black_score').html() == 0 ){
						alert("Red wins!... press the reset button to play again!!");
					}
				// <------------------------------->

				if( $('.checker-cell').hasClass('move-checker') ){
					//get data-count clicked for the row
					move_row_count = $(this).parent().attr('data-rows');
					//get data for if a checker exists
					move_checker_conflict = $(this).children('.checker').length;
					//get cell data-count attribute
					move_checkercell_count = $(this).attr('data-count');
					move_row_count_double = $('.cr[data-rows="'+ eval(move_row_count + 2) +'"]').children().children('.black-checker').length;
					//console.log( 'move row -2 = '+ move_row_count_double);
					//get data cell for selcted for double jump
					move_cell = $(this).attr('data-cell');

					

					//check for king
					if(select_king_exist !=0){
						console.log('you selected a king');

						//black, red, and no checker in move area
						if (move_checker_conflict == 0 ) {
								//for next row empty
								if(move_row_count == eval(select_row_count) - 1 || move_row_count == eval(select_row_count) + 1){
									//if row is even
									if(select_row_count % 2 === 0){
										// if same or 1 cell can be moved to
										if( select_checkercell_count == move_checkercell_count || eval(move_checkercell_count - select_checkercell_count == 1) ){
											console.log("valid move");
										
											$('.checker-cell[data-cell="'+select_cell+'"]').empty();
											
											$(this).append(select_move);
											$('.checker-cell').removeClass('move-checker');
											$('.checker-cell').removeClass('move-double');
											double_jump_active = false;
											//update done counter
											//alert('Move completed');

											turn_black = true;
											
										}else{
											console.log("invalid move - pick ajoining cell");
										}
									//if row is odd
									}else{
										// if same or -1 can be moved to
										if( select_checkercell_count == move_checkercell_count || eval(move_checkercell_count - select_checkercell_count == -1) ){
											console.log("valid move");
											
											$('.checker-cell[data-cell="'+select_cell+'"]').empty();
											
											$(this).append(select_move);
											$('.checker-cell').removeClass('move-checker');
											$('.checker-cell').removeClass('move-double');
											double_jump_active = false;
											//update done counter
											//alert('Move completed');

											turn_black = true;
											
								
										}else{
											alert("invalid move - pick ajoining cell");
										}
									}
								}else{
									//check if next row contains black checkers or behind contains black if king
									if(select_row_next !=0 || select_row_next_king !=0){
										console.log("there are black checkers in next row");
									
										if( move_checkercell_count == eval(select_checkercell_count) - 1 ||  move_checkercell_count == eval(select_checkercell_count) + 1 ){
											console.log('valid cell to jump to');

											//find black checkers location
											blacks = []
											$('.cr').each(function(i){
												each_black = $(this).children().children('.black-checker')
												$.each(each_black, function(p){
													row = $(this).parent().parent().attr('data-rows');
													black = $(this).parent().attr('data-count');
													black_data_cell = $(this).parent().attr('data-cell');
													blacks.push({'row': row,
																'cell': black,
																'data_cell': black_data_cell});
												});
											});

											//find red checkers location
											rows = []
											$('.cr').each(function(i){
												each_checker = $(this).children('.black');
												$.each(each_checker, function(p){
													row = $(this).parent().attr('data-rows');
													checker = $(this).attr('data-count');
													checker_data_cell = $(this).children('.checker').length;
													rows.push({'row': row,
																'cell': checker,
																'checker_length': checker_data_cell});
												});
											});
											//get init $this
											this_this = $(this);
											//find red checker to jump
											jump_count = 0;
											$.each(blacks, function(i, v){
												//if going down board 8 -----------> 1
												if( v.row == eval(select_row_count) - 1 ){
													// console.log('Red in: '+v.cell);
													//if row is even
													if(select_row_count % 2 === 0){
														//added jump can be 2 rows ahead only
														if(move_checkercell_count == v.cell && eval(move_checkercell_count) - 1 == select_checkercell_count && move_row_count == eval(select_row_count) - 2 ){
															jump_count++
															
															//move to black checker
															$('.checker-cell[data-cell="'+select_cell+'"]').empty();
															
															this_this.append(select_move);
															$('.checker-cell').removeClass('move-checker');
															//remove red checker
															$('.checker-cell[data-cell="'+v.data_cell+'"]').empty();
															
															//update done counter
															

															//even double jump
															if ( move_row_count_double == 4) {
																console.log("no double jump possible");
																$('.checker-cell').removeClass('move-checker');
																$('.checker-cell').removeClass('move-double');
																double_jump_active = false;
																//update done counter
																alert('Move completed');

																turn_black = true;
															}else{
																//for even
																double_next_left ="no";
																double_next_right ="no";
																$.each(blacks, function(key,val){
																	if(val.row == eval(select_row_count) - 3){
																		
																		if( val.cell == move_checkercell_count ){
																			double_next_left = "yes"
																			console.log('left');
																		}
																		if( val.cell == eval(move_checkercell_count) + 1 ){
																			double_next_right = "yes"
																			console.log('right');
																		}	
																	}
																});
																double_jump = 0;
																if(double_next_left == "yes"){
																	$.each(rows, function(kk,vv){
																		if( vv.row == eval(select_row_count) - 4 ){
																			if (vv.checker_length == 0) {
																				if(move_row_count % 2 == 0){
																					if ( vv.cell == eval(move_checkercell_count) - 1 ) {
																						double_jump++;
																						console.log('you can double jump into cell: '+ vv.cell);
																						$('.checker-cell').removeClass('move-checker');
																						this_this.addClass('move-double');
																						double_jump_active = true;
																					}
																				}
																			}

																		}
																	});
																}

																if(double_next_right == "yes"){
																	$.each(rows, function(kk,vv){
																		if( vv.row == eval(select_row_count) - 4 ){
																			if (vv.checker_length == 0) {
																				if(move_row_count % 2 == 0){
																					if ( vv.cell == eval(move_checkercell_count) + 1 ) {
																						double_jump++;
																						console.log('you can double jump into cell: '+ vv.cell);
																						$('.checker-cell').removeClass('move-checker');
																						this_this.addClass('move-double');
																						double_jump_active = true;

																						
																						

																					}
																				}
																			}

																		}
																	});

																}
																if (double_next_right == "no" && double_next_left == "no"){
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	turn_black = true;
																}
																if(double_jump === 0){
																	console.log('no valid double jump..ending turn');
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	turn_black = true;
																}
																
															}
															
															
											
															return false;
															
														}
														if( eval(move_checkercell_count) + 1 == v.cell && eval(move_checkercell_count) + 1 == select_checkercell_count & move_row_count == eval(select_row_count) - 2){
															jump_count++

															//move to black checker
															$('.checker-cell[data-cell="'+select_cell+'"]').empty();
															
															this_this.append(select_move);
															$('.checker-cell').removeClass('move-checker');
															//remove red checker
															$('.checker-cell[data-cell="'+v.data_cell+'"]').empty();
															
															//update done counter
															

															//even double jump
															if ( move_row_count_double == 4) {
																console.log("no double jump possible");
																$('.checker-cell').removeClass('move-checker');
																$('.checker-cell').removeClass('move-double');
																double_jump_active = false;
																//update done counter
																alert('Move completed');

																turn_black = true;
															}else{
																//for even
																double_next_left ="no";
																double_next_right ="no";
																$.each(blacks, function(key,val){
																	if(val.row == eval(select_row_count) - 3){
																		
																		if( val.cell == move_checkercell_count ){
																			double_next_left = "yes"
																			console.log('left');
																		}
																		if( val.cell == eval(move_checkercell_count) + 1 ){
																			double_next_right = "yes"
																			console.log('right');
																		}	
																	}
																});
																double_jump = 0;
																if(double_next_left == "yes"){
																	$.each(rows, function(kk,vv){
																		if( vv.row == eval(select_row_count) - 4 ){
																			if (vv.checker_length == 0) {
																				if(move_row_count % 2 == 0){
																					if ( vv.cell == eval(move_checkercell_count) - 1 ) {
																						double_jump++;
																						console.log('you can double jump into cell: '+ vv.cell);
																						$('.checker-cell').removeClass('move-checker');
																						this_this.addClass('move-double');
																						double_jump_active = true;
																					}
																				}
																			}

																		}
																	});
																}

																if(double_next_right == "yes"){
																	$.each(rows, function(kk,vv){
																		if( vv.row == eval(select_row_count) - 4 ){
																			if (vv.checker_length == 0) {
																				if(move_row_count % 2 == 0){
																					if ( vv.cell == eval(move_checkercell_count) + 1 ) {
																						double_jump++;
																						console.log('you can double jump into cell: '+ vv.cell);
																						$('.checker-cell').removeClass('move-checker');
																						this_this.addClass('move-double');
																						double_jump_active = true;

																						
																						

																					}
																				}
																			}

																		}
																	});

																}
																if (double_next_right == "no" && double_next_left == "no"){
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	turn_black = true;
																}
																if(double_jump === 0){
																	console.log('no valid double jump..ending turn');
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	turn_black = true;
																}
																
															}
															
															
														
															return false;
															

														}
													//if odd
													}else{
														
														if( move_checkercell_count == v.cell && eval(move_checkercell_count) + 1 == select_checkercell_count & move_row_count == eval(select_row_count) - 2 ){
															jump_count++

																//move to black checker
																$('.checker-cell[data-cell="'+select_cell+'"]').empty();
																
																this_this.append(select_move);
																$('.checker-cell').removeClass('move-checker');
																//remove red checker
																$('.checker-cell[data-cell="'+v.data_cell+'"]').empty();
																
																//update done counter
																

																//odd doubel jump
																if ( move_row_count_double == 4) {
																	console.log("no double jump possible");
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	//update done counter
																	//alert('Move completed');

																	turn_black = true;
																}else{
																	//for odd
																	double_next_left ="no";
																	double_next_right ="no";
																	$.each(blacks, function(key,val){
																		if(val.row == eval(select_row_count) - 3){
																			
																			if( val.cell == eval(move_checkercell_count) - 1 ){
																				double_next_left = "yes"
																				console.log('left');
																			}
																			if(val.cell == move_checkercell_count ){
																				double_next_right = "yes"
																				console.log('right');
																			}	
																		}
																	});
																	double_jump = 0;
																	if(double_next_left == "yes"){
																		$.each(rows, function(kk,vv){
																			if( vv.row == eval(select_row_count) - 4 ){
																				if (vv.checker_length == 0) {
																					if(move_row_count % 2 != 0){
																						if ( vv.cell == eval(move_checkercell_count) - 1 ) {
																							double_jump++;
																							console.log('you can double jump into cell: '+ vv.cell);
																							$('.checker-cell').removeClass('move-checker');
																							this_this.addClass('move-double');
																							double_jump_active = true;
																						}
																					}
																				}

																			}
																		});
																	}

																	if(double_next_right == "yes"){
																		$.each(rows, function(kk,vv){
																			if( vv.row == eval(select_row_count) - 4 ){
																				if (vv.checker_length == 0) {
																					if(move_row_count % 2 != 0){
																						if ( vv.cell == eval(move_checkercell_count) + 1 ) {
																							double_jump++;
																							console.log('you can double jump into cell: '+ vv.cell);
																							$('.checker-cell').removeClass('move-checker');
																							this_this.addClass('move-double');
																							double_jump_active = true;
																						}
																					}
																				}

																			}
																		});

																	}
																	if (double_next_right == "no" && double_next_left == "no"){
																		$('.checker-cell').removeClass('move-checker');
																		$('.checker-cell').removeClass('move-double');
																		double_jump_active = false;
																		turn_black = true;
																	}
																	if(double_jump === 0){
																		console.log('no valid double jump..ending turn');
																		$('.checker-cell').removeClass('move-checker');
																		$('.checker-cell').removeClass('move-double');
																		double_jump_active = false;
																		turn_black = true;
																	}
																}
																
															
																
																return false;
															
														}
														if( eval(move_checkercell_count) - 1 == v.cell && eval(move_checkercell_count) - 1 == select_checkercell_count & move_row_count == eval(select_row_count) - 2 ){
															jump_count++

															//move to black checker
															$('.checker-cell[data-cell="'+select_cell+'"]').empty();
															
															this_this.append(select_move);
															$('.checker-cell').removeClass('move-checker');
															//remove red checker
															$('.checker-cell[data-cell="'+v.data_cell+'"]').empty();
															
															//update done counter
															
															
															//odd doubel jump
															if ( move_row_count_double == 4) {
																console.log("no double jump possible");
																$('.checker-cell').removeClass('move-checker');
																$('.checker-cell').removeClass('move-double');
																double_jump_active = false;
																//update done counter
																//alert('Move completed');

																turn_black = true;
															}else{
																//for odd
																double_next_left ="no";
																double_next_right ="no";
																$.each(blacks, function(key,val){
																	if(val.row == eval(select_row_count) - 3){
																		
																		if( val.cell == eval(move_checkercell_count) - 1 ){
																			double_next_left = "yes"
																			console.log('left');
																		}
																		if(val.cell == move_checkercell_count ){
																			double_next_right = "yes"
																			console.log('right');
																		}	
																	}
																});
																double_jump = 0;
																if(double_next_left == "yes"){
																	$.each(rows, function(kk,vv){
																		if( vv.row == eval(select_row_count) - 4 ){
																			if (vv.checker_length == 0) {
																				if(move_row_count % 2 != 0){
																					if ( vv.cell == eval(move_checkercell_count) - 1 ) {
																						double_jump++;
																						console.log('you can double jump into cell: '+ vv.cell);
																						$('.checker-cell').removeClass('move-checker');
																						this_this.addClass('move-double');
																						double_jump_active = true;
																					}
																				}
																			}

																		}
																	});
																}

																if(double_next_right == "yes"){
																	$.each(rows, function(kk,vv){
																		if( vv.row == eval(select_row_count) - 4 ){
																			if (vv.checker_length == 0) {
																				if(move_row_count % 2 != 0){
																					if ( vv.cell == eval(move_checkercell_count) + 1 ) {
																						double_jump++;
																						console.log('you can double jump into cell: '+ vv.cell);
																						$('.checker-cell').removeClass('move-checker');
																						this_this.addClass('move-double');
																						double_jump_active = true;

																						
																						

																					}
																				}
																			}

																		}
																	});

																}
																if (double_next_right == "no" && double_next_left == "no"){
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	turn_black = true;
																}
																if(double_jump === 0){
																	console.log('no valid double jump..ending turn');
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	turn_black = true;
																}
															}
														
															return false;
															

														}

													}
												//if going up board	1----------------->8
												}else if ( v.row == eval(select_row_count) + 1){

													// console.log('Red in: '+v.cell);
													//if row is even
													if(select_row_count % 2 === 0){
														//added jump can be 2 rows ahead only
														if(move_checkercell_count == v.cell && eval(move_checkercell_count) - 1 == select_checkercell_count && move_row_count == eval(select_row_count) + 2 ){
															jump_count++
															
															//move to black checker
															$('.checker-cell[data-cell="'+select_cell+'"]').empty();
															
															this_this.append(select_move);
															$('.checker-cell').removeClass('move-checker');
															//remove red checker
															$('.checker-cell[data-cell="'+v.data_cell+'"]').empty();
															
															//update done counter
															
															
															//even double jump
															if ( move_row_count_double == 4) {
																console.log("no double jump possible");
																$('.checker-cell').removeClass('move-checker');
																$('.checker-cell').removeClass('move-double');
																double_jump_active = false;
																//update done counter
																alert('Move completed');

																turn_black = true;
															}else{
																//for even
																double_next_left ="no";
																double_next_right ="no";
																$.each(blacks, function(key,val){
																	if(val.row == eval(select_row_count) + 3){
																		
																		if( val.cell == move_checkercell_count ){
																			double_next_left = "yes"
																			console.log('left');
																		}
																		if( val.cell == eval(move_checkercell_count) + 1 ){
																			double_next_right = "yes"
																			console.log('right');
																		}	
																	}
																});
																double_jump = 0;
																if(double_next_left == "yes"){
																	$.each(rows, function(kk,vv){
																		if( vv.row == eval(select_row_count) + 4 ){
																			if (vv.checker_length == 0) {
																				if(move_row_count % 2 == 0){
																					if ( vv.cell == eval(move_checkercell_count) - 1 ) {
																						double_jump++;
																						console.log('you can double jump into cell: '+ vv.cell);
																						$('.checker-cell').removeClass('move-checker');
																						this_this.addClass('move-double');
																						double_jump_active = true;
																					}
																				}
																			}

																		}
																	});
																}

																if(double_next_right == "yes"){
																	$.each(rows, function(kk,vv){
																		if( vv.row == eval(select_row_count) + 4 ){
																			if (vv.checker_length == 0) {
																				if(move_row_count % 2 == 0){
																					if ( vv.cell == eval(move_checkercell_count) + 1 ) {
																						double_jump++;
																						console.log('you can double jump into cell: '+ vv.cell);
																						$('.checker-cell').removeClass('move-checker');
																						this_this.addClass('move-double');
																						double_jump_active = true;

																						
																						

																					}
																				}
																			}

																		}
																	});

																}
																if (double_next_right == "no" && double_next_left == "no"){
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	turn_black = true;
																}
																if(double_jump === 0){
																	console.log('no valid double jump..ending turn');
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	turn_black = true;
																}
																
															}
											
															return false;
															
														}
														if( eval(move_checkercell_count) + 1 == v.cell && eval(move_checkercell_count) + 1 == select_checkercell_count & move_row_count == eval(select_row_count) + 2){
															jump_count++

															//move to black checker
															$('.checker-cell[data-cell="'+select_cell+'"]').empty();
															
															this_this.append(select_move);
															$('.checker-cell').removeClass('move-checker');
															//remove red checker
															$('.checker-cell[data-cell="'+v.data_cell+'"]').empty();
															
															//update done counter
															
															
															//even double jump
															if ( move_row_count_double == 4) {
																console.log("no double jump possible");
																$('.checker-cell').removeClass('move-checker');
																$('.checker-cell').removeClass('move-double');
																double_jump_active = false;
																//update done counter
																alert('Move completed');

																turn_black = true;
															}else{
																//for even
																double_next_left ="no";
																double_next_right ="no";
																$.each(blacks, function(key,val){
																	if(val.row == eval(select_row_count) + 3){
																		
																		if( val.cell == move_checkercell_count ){
																			double_next_left = "yes"
																			console.log('left');
																		}
																		if( val.cell == eval(move_checkercell_count) + 1 ){
																			double_next_right = "yes"
																			console.log('right');
																		}	
																	}
																});
																double_jump = 0;
																if(double_next_left == "yes"){
																	$.each(rows, function(kk,vv){
																		if( vv.row == eval(select_row_count) + 4 ){
																			if (vv.checker_length == 0) {
																				if(move_row_count % 2 == 0){
																					if ( vv.cell == eval(move_checkercell_count) - 1 ) {
																						double_jump++;
																						console.log('you can double jump into cell: '+ vv.cell);
																						$('.checker-cell').removeClass('move-checker');
																						this_this.addClass('move-double');
																						double_jump_active = true;
																					}
																				}
																			}

																		}
																	});
																}

																if(double_next_right == "yes"){
																	$.each(rows, function(kk,vv){
																		if( vv.row == eval(select_row_count) + 4 ){
																			if (vv.checker_length == 0) {
																				if(move_row_count % 2 == 0){
																					if ( vv.cell == eval(move_checkercell_count) + 1 ) {
																						double_jump++;
																						console.log('you can double jump into cell: '+ vv.cell);
																						$('.checker-cell').removeClass('move-checker');
																						this_this.addClass('move-double');
																						double_jump_active = true;

																						
																						

																					}
																				}
																			}

																		}
																	});

																}
																if (double_next_right == "no" && double_next_left == "no"){
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	turn_black = true;
																}
																if(double_jump === 0){
																	console.log('no valid double jump..ending turn');
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	turn_black = true;
																}
																
															}
														
															return false;
															
														}
													//if odd
													}else{
														
														if( move_checkercell_count == v.cell && eval(move_checkercell_count) + 1 == select_checkercell_count & move_row_count == eval(select_row_count) + 2 ){
															jump_count++

															//move to black checker
															$('.checker-cell[data-cell="'+select_cell+'"]').empty();
															
															this_this.append(select_move);
															$('.checker-cell').removeClass('move-checker');
															//remove red checker
															$('.checker-cell[data-cell="'+v.data_cell+'"]').empty();
															
															//update done counter
															
															
															//odd double jump
															if ( move_row_count_double == 4) {
																console.log("no double jump possible");
																$('.checker-cell').removeClass('move-checker');
																$('.checker-cell').removeClass('move-double');
																double_jump_active = false;
																//update done counter
																//alert('Move completed');

																turn_black = true;
															}else{
																//for odd
																double_next_left ="no";
																double_next_right ="no";
																$.each(blacks, function(key,val){
																	if(val.row == eval(select_row_count) + 3){
																		
																		if( val.cell == eval(move_checkercell_count) - 1 ){
																			double_next_left = "yes"
																			console.log('left');
																		}
																		if(val.cell == move_checkercell_count ){
																			double_next_right = "yes"
																			console.log('right');
																		}	
																	}
																});
																double_jump = 0;
																if(double_next_left == "yes"){
																	$.each(rows, function(kk,vv){
																		if( vv.row == eval(select_row_count) + 4 ){
																			if (vv.checker_length == 0) {
																				if(move_row_count % 2 != 0){
																					if ( vv.cell == eval(move_checkercell_count) - 1 ) {
																						double_jump++;
																						console.log('you can double jump into cell: '+ vv.cell);
																						$('.checker-cell').removeClass('move-checker');
																						this_this.addClass('move-double');
																						double_jump_active = true;
																					}
																				}
																			}

																		}
																	});
																}

																if(double_next_right == "yes"){
																	$.each(rows, function(kk,vv){
																		if( vv.row == eval(select_row_count) + 4 ){
																			if (vv.checker_length == 0) {
																				if(move_row_count % 2 != 0){
																					if ( vv.cell == eval(move_checkercell_count) + 1 ) {
																						double_jump++;
																						console.log('you can double jump into cell: '+ vv.cell);
																						$('.checker-cell').removeClass('move-checker');
																						this_this.addClass('move-double');
																						double_jump_active = true;

																						
																						

																					}
																				}
																			}

																		}
																	});

																}
																if (double_next_right == "no" && double_next_left == "no"){
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	turn_black = true;
																}
																if(double_jump === 0){
																	console.log('no valid double jump..ending turn');
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	turn_black = true;
																}
															}
														
															
															return false;
															
														}
														if( eval(move_checkercell_count) - 1 == v.cell && eval(move_checkercell_count) - 1 == select_checkercell_count & move_row_count == eval(select_row_count) + 2 ){
															jump_count++

															//move to black checker
															$('.checker-cell[data-cell="'+select_cell+'"]').empty();
															
															this_this.append(select_move);
															$('.checker-cell').removeClass('move-checker');
															//remove red checker
															$('.checker-cell[data-cell="'+v.data_cell+'"]').empty();
															
															//update done counter
															
															
															//odd double jump
															if ( move_row_count_double == 4) {
																console.log("no double jump possible");
																$('.checker-cell').removeClass('move-checker');
																$('.checker-cell').removeClass('move-double');
																double_jump_active = false;
																//update done counter
																//alert('Move completed');

																turn_black = true;
															}else{
																//for odd
																double_next_left ="no";
																double_next_right ="no";
																$.each(blacks, function(key,val){
																	if(val.row == eval(select_row_count) + 3){
																		
																		if( val.cell == eval(move_checkercell_count) - 1 ){
																			double_next_left = "yes"
																			console.log('left');
																		}
																		if(val.cell == move_checkercell_count ){
																			double_next_right = "yes"
																			console.log('right');
																		}	
																	}
																});
																double_jump = 0;
																if(double_next_left == "yes"){
																	$.each(rows, function(kk,vv){
																		if( vv.row == eval(select_row_count) + 4 ){
																			if (vv.checker_length == 0) {
																				if(move_row_count % 2 != 0){
																					if ( vv.cell == eval(move_checkercell_count) - 1 ) {
																						double_jump++;
																						console.log('you can double jump into cell: '+ vv.cell);
																						$('.checker-cell').removeClass('move-checker');
																						this_this.addClass('move-double');
																						double_jump_active = true;
																					}
																				}
																			}

																		}
																	});
																}

																if(double_next_right == "yes"){
																	$.each(rows, function(kk,vv){
																		if( vv.row == eval(select_row_count) + 4 ){
																			if (vv.checker_length == 0) {
																				if(move_row_count % 2 != 0){
																					if ( vv.cell == eval(move_checkercell_count) + 1 ) {
																						double_jump++;
																						console.log('you can double jump into cell: '+ vv.cell);
																						$('.checker-cell').removeClass('move-checker');
																						this_this.addClass('move-double');
																						double_jump_active = true;

																						
																						

																					}
																				}
																			}

																		}
																	});

																}
																if (double_next_right == "no" && double_next_left == "no"){
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	turn_black = true;
																}
																if(double_jump === 0){
																	console.log('no valid double jump..ending turn');
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	turn_black = true;
																}
															}
														
															return false;
															

														}

													}
												}
											});
											// if no checker to jump...
											if(jump_count === 0){
												alert('invalid - nothing to jump');
											}

										}else{
											alert('invalid jump position');
										}

									}else{
										alert("invalid - You cannot move to that row");
									}
									
								}

						// if length is not 0 = checker in cell
						}else{
							alert("invalid move - there is already checker there");
						}


					//no king selected...
					}else{
					
						//make sure moving up the board -- change for red checkers - --changed for red
						if (move_row_count > select_row_count) {
							
							//black, red, and no checker in move area
							if (move_checker_conflict == 0 ) {
									//for next row empty - --changed for red
									if(move_row_count == eval(select_row_count) + 1){
										//if row is even
										if(select_row_count % 2 === 0){
											// if same or 1 cell can be moved to
											if( select_checkercell_count == move_checkercell_count || eval(move_checkercell_count - select_checkercell_count == 1) ){
												console.log("valid move");
												if(move_row_count == 8){
													
													//change to k and add black king class
													$('.checker-cell[data-cell="'+select_cell+'"]').empty();
													
													$(this).append(select_move);
													$(this).children('.red-checker').addClass('red-king');
													
									
													$('.checker-cell').removeClass('move-checker');
													$('.checker-cell').removeClass('move-double');
													double_jump_active = false;
													//update done counter
													//alert('Move completed');

													turn_black = true;
												}else{
												
													$('.checker-cell[data-cell="'+select_cell+'"]').empty();
													
													$(this).append(select_move);
													$('.checker-cell').removeClass('move-checker');
													$('.checker-cell').removeClass('move-double');
													double_jump_active = false;
													//update done counter
													//alert('Move completed');
													turn_black = true;
												}
											}else{
												alert("invalid move - pick ajoining cell");
											}
										//if row is odd
										}else{
											// if same or -1 can be moved to
											if( select_checkercell_count == move_checkercell_count || eval(move_checkercell_count - select_checkercell_count == -1) ){
												console.log("valid move");

												if(move_row_count == 8){
													
													//change to k and add black king class
													$('.checker-cell[data-cell="'+select_cell+'"]').empty();
													
													$(this).append(select_move);
													$(this).children('.red-checker').addClass('red-king');
													
									
													$('.checker-cell').removeClass('move-checker');
													$('.checker-cell').removeClass('move-double');
													double_jump_active = false;
													//update done counter
													//alert('Move completed');

													turn_black = true;
												}else{
													$('.checker-cell[data-cell="'+select_cell+'"]').empty();
													
													$(this).append(select_move);
													$('.checker-cell').removeClass('move-checker');
													$('.checker-cell').removeClass('move-double');
													double_jump_active = false;
													//update done counter
													//alert('Move completed');
													turn_black = true;
												}	
											}else{
												alert("invalid move - pick ajoining cell");
											}
										}
									}else{
										//check if next row contains black checkers
										if(select_row_next !=0){
											console.log("there are black checkers in next row");
										
											if( move_checkercell_count == eval(select_checkercell_count) - 1 ||  move_checkercell_count == eval(select_checkercell_count) + 1 ){
												console.log('valid cell to jump to');

												//find black checkers location
												blacks = []
												$('.cr').each(function(i){
													each_black = $(this).children().children('.black-checker')
													$.each(each_black, function(p){
														row = $(this).parent().parent().attr('data-rows');
														black = $(this).parent().attr('data-count');
														black_data_cell = $(this).parent().attr('data-cell');
														blacks.push({'row': row,
																	'cell': black,
																	'data_cell': black_data_cell});
													});
												});

												//find red checkers location
												rows = []
												$('.cr').each(function(i){
													each_checker = $(this).children('.black');
													$.each(each_checker, function(p){
														row = $(this).parent().attr('data-rows');
														checker = $(this).attr('data-count');
														checker_data_cell = $(this).children('.checker').length;
														rows.push({'row': row,
																	'cell': checker,
																	'checker_length': checker_data_cell});
													});
												});
												//get init $this
												this_this = $(this);
												//find red checker to jump
												jump_count = 0;
												$.each(blacks, function(i, v){
													if( v.row == eval(select_row_count) + 1 ){
														// console.log('Black in: '+v.cell);
														//if row is even
														if(select_row_count % 2 === 0){
															if(move_checkercell_count == v.cell && eval(move_checkercell_count) - 1 == select_checkercell_count && move_row_count == eval(select_row_count) + 2 ){
																jump_count++

																if(move_row_count == 8){
													
																	//change to k and add black king class
																	$('.checker-cell[data-cell="'+select_cell+'"]').empty();
																	
																	this_this.append(select_move);
																	this_this.children('.red-checker').addClass('red-king');
																	
																	//remove black checker
																	$('.checker-cell[data-cell="'+v.data_cell+'"]').empty();
																	
													
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	//update done counter
																	//alert('Move completed');

																	turn_black = true;
																}else{
																	//move red checker
																	$('.checker-cell[data-cell="'+select_cell+'"]').empty();
																	
																	this_this.append(select_move);
																	$('.checker-cell').removeClass('move-checker');
																	//remove black checker
																	$('.checker-cell[data-cell="'+v.data_cell+'"]').empty();
																	
																	//update done counter
																	
																	
																	//even double jump
																	if ( move_row_count_double == 4) {
																		console.log("no double jump possible");
																		$('.checker-cell').removeClass('move-checker');
																		$('.checker-cell').removeClass('move-double');
																		double_jump_active = false;
																		//update done counter
																		alert('Move completed');

																		turn_black = true;
																	}else{
																		//for even
																		double_next_left ="no";
																		double_next_right ="no";
																		$.each(blacks, function(key,val){
																			if(val.row == eval(select_row_count) + 3){
																				
																				if( val.cell == move_checkercell_count ){
																					double_next_left = "yes"
																					console.log('left');
																				}
																				if( val.cell == eval(move_checkercell_count) + 1 ){
																					double_next_right = "yes"
																					console.log('right');
																				}	
																			}
																		});
																		double_jump = 0;
																		if(double_next_left == "yes"){
																			$.each(rows, function(kk,vv){
																				if( vv.row == eval(select_row_count) + 4 ){
																					if (vv.checker_length == 0) {
																						if(move_row_count % 2 == 0){
																							if ( vv.cell == eval(move_checkercell_count) - 1 ) {
																								double_jump++;
																								console.log('you can double jump into cell: '+ vv.cell);
																								$('.checker-cell').removeClass('move-checker');
																								this_this.addClass('move-double');
																								double_jump_active = true;
																							}
																						}
																					}

																				}
																			});
																		}

																		if(double_next_right == "yes"){
																			$.each(rows, function(kk,vv){
																				if( vv.row == eval(select_row_count) + 4 ){
																					if (vv.checker_length == 0) {
																						if(move_row_count % 2 == 0){
																							if ( vv.cell == eval(move_checkercell_count) + 1 ) {
																								double_jump++;
																								console.log('you can double jump into cell: '+ vv.cell);
																								$('.checker-cell').removeClass('move-checker');
																								this_this.addClass('move-double');
																								double_jump_active = true;

																								
																								

																							}
																						}
																					}

																				}
																			});

																		}
																		if (double_next_right == "no" && double_next_left == "no"){
																			$('.checker-cell').removeClass('move-checker');
																			$('.checker-cell').removeClass('move-double');
																			double_jump_active = false;
																			turn_black = true;
																		}
																		if(double_jump === 0){
																			console.log('no valid double jump..ending turn');
																			$('.checker-cell').removeClass('move-checker');
																			$('.checker-cell').removeClass('move-double');
																			double_jump_active = false;
																			turn_black = true;
																		}
																		
																	}
																	
																	
																	return false;
																}
															}
															if( eval(move_checkercell_count) + 1 == v.cell && eval(move_checkercell_count) + 1 == select_checkercell_count && move_row_count == eval(select_row_count) + 2 ){
																jump_count++

																if(move_row_count == 8){
													
																	//change to k and add black king class
																	$('.checker-cell[data-cell="'+select_cell+'"]').empty();
																	
																	this_this.append(select_move);
																	this_this.children('.red-checker').addClass('red-king');
																	
																	//remove black checker
																	$('.checker-cell[data-cell="'+v.data_cell+'"]').empty();
																	
													
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	//update done counter
																	//alert('Move completed');

																	turn_black = true;
																}else{
																	//move red checker
																	$('.checker-cell[data-cell="'+select_cell+'"]').empty();
																	
																	this_this.append(select_move);
																	$('.checker-cell').removeClass('move-checker');
																	//remove black checker
																	$('.checker-cell[data-cell="'+v.data_cell+'"]').empty();
																	
																	//update done counter
																	
																	
																	//even double jump
																	if ( move_row_count_double == 4) {
																		console.log("no double jump possible");
																		$('.checker-cell').removeClass('move-checker');
																		$('.checker-cell').removeClass('move-double');
																		double_jump_active = false;
																		//update done counter
																		alert('Move completed');

																		turn_black = true;
																	}else{
																		//for even
																		double_next_left ="no";
																		double_next_right ="no";
																		$.each(blacks, function(key,val){
																			if(val.row == eval(select_row_count) + 3){
																				
																				if( val.cell == move_checkercell_count ){
																					double_next_left = "yes"
																					console.log('left');
																				}
																				if( val.cell == eval(move_checkercell_count) + 1 ){
																					double_next_right = "yes"
																					console.log('right');
																				}	
																			}
																		});
																		double_jump = 0;
																		if(double_next_left == "yes"){
																			$.each(rows, function(kk,vv){
																				if( vv.row == eval(select_row_count) + 4 ){
																					if (vv.checker_length == 0) {
																						if(move_row_count % 2 == 0){
																							if ( vv.cell == eval(move_checkercell_count) - 1 ) {
																								double_jump++;
																								console.log('you can double jump into cell: '+ vv.cell);
																								$('.checker-cell').removeClass('move-checker');
																								this_this.addClass('move-double');
																								double_jump_active = true;
																							}
																						}
																					}

																				}
																			});
																		}

																		if(double_next_right == "yes"){
																			$.each(rows, function(kk,vv){
																				if( vv.row == eval(select_row_count) + 4 ){
																					if (vv.checker_length == 0) {
																						if(move_row_count % 2 == 0){
																							if ( vv.cell == eval(move_checkercell_count) + 1 ) {
																								double_jump++;
																								console.log('you can double jump into cell: '+ vv.cell);
																								$('.checker-cell').removeClass('move-checker');
																								this_this.addClass('move-double');
																								double_jump_active = true;

																								
																								

																							}
																						}
																					}

																				}
																			});

																		}
																		if (double_next_right == "no" && double_next_left == "no"){
																			$('.checker-cell').removeClass('move-checker');
																			$('.checker-cell').removeClass('move-double');
																			double_jump_active = false;
																			turn_black = true;
																		}
																		if(double_jump === 0){
																			console.log('no valid double jump..ending turn');
																			$('.checker-cell').removeClass('move-checker');
																			$('.checker-cell').removeClass('move-double');
																			double_jump_active = false;
																			turn_black = true;
																		}
																		
																	}
																	
																	
																	return false;
																}

															}
														//if odd
														}else{
															if(move_checkercell_count == v.cell && eval(move_checkercell_count) + 1 == select_checkercell_count && move_row_count == eval(select_row_count) + 2 ){
																jump_count++

																if(move_row_count == 8){
													
																	//change to k and add black king class
																	$('.checker-cell[data-cell="'+select_cell+'"]').empty();
																	
																	this_this.append(select_move);
																	this_this.children('.red-checker').addClass('red-king');
																	
																	//remove black checker
																	$('.checker-cell[data-cell="'+v.data_cell+'"]').empty();
																	
													
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	//update done counter
																	//alert('Move completed');

																	turn_black = true;
																}else{
																	//move red checker
																	$('.checker-cell[data-cell="'+select_cell+'"]').empty();
																	
																	this_this.append(select_move);
																	$('.checker-cell').removeClass('move-checker');
																	//remove black checker
																	$('.checker-cell[data-cell="'+v.data_cell+'"]').empty();
																	
																	//update done counter
																	
																	
																	//odd double jump
																	if ( move_row_count_double == 4) {
																		console.log("no double jump possible");
																		$('.checker-cell').removeClass('move-checker');
																		$('.checker-cell').removeClass('move-double');
																		double_jump_active = false;
																		//update done counter
																		//alert('Move completed');

																		turn_black = true;
																	}else{
																		//for odd
																		double_next_left ="no";
																		double_next_right ="no";
																		$.each(blacks, function(key,val){
																			if(val.row == eval(select_row_count) + 3){
																				
																				if( val.cell == eval(move_checkercell_count) - 1 ){
																					double_next_left = "yes"
																					console.log('left');
																				}
																				if(val.cell == move_checkercell_count ){
																					double_next_right = "yes"
																					console.log('right');
																				}	
																			}
																		});
																		double_jump = 0;
																		if(double_next_left == "yes"){
																			$.each(rows, function(kk,vv){
																				if( vv.row == eval(select_row_count) + 4 ){
																					if (vv.checker_length == 0) {
																						if(move_row_count % 2 != 0){
																							if ( vv.cell == eval(move_checkercell_count) - 1 ) {
																								double_jump++;
																								console.log('you can double jump into cell: '+ vv.cell);
																								$('.checker-cell').removeClass('move-checker');
																								this_this.addClass('move-double');
																								double_jump_active = true;
																							}
																						}
																					}

																				}
																			});
																		}

																		if(double_next_right == "yes"){
																			$.each(rows, function(kk,vv){
																				if( vv.row == eval(select_row_count) + 4 ){
																					if (vv.checker_length == 0) {
																						if(move_row_count % 2 != 0){
																							if ( vv.cell == eval(move_checkercell_count) + 1 ) {
																								double_jump++;
																								console.log('you can double jump into cell: '+ vv.cell);
																								$('.checker-cell').removeClass('move-checker');
																								this_this.addClass('move-double');
																								double_jump_active = true;

																								
																								

																							}
																						}
																					}

																				}
																			});

																		}
																		if (double_next_right == "no" && double_next_left == "no"){
																			$('.checker-cell').removeClass('move-checker');
																			$('.checker-cell').removeClass('move-double');
																			double_jump_active = false;
																			turn_black = true;
																		}
																		if(double_jump === 0){
																			console.log('no valid double jump..ending turn');
																			$('.checker-cell').removeClass('move-checker');
																			$('.checker-cell').removeClass('move-double');
																			double_jump_active = false;
																			turn_black = true;
																		}
																	}
																	
																	return false;
																}
															}
															if( eval(move_checkercell_count) -1 == v.cell && eval(move_checkercell_count) - 1 == select_checkercell_count && move_row_count == eval(select_row_count) + 2 ){
																jump_count++

																if(move_row_count == 8){
													
																	//change to k and add black king class
																	$('.checker-cell[data-cell="'+select_cell+'"]').empty();
																	
																	this_this.append(select_move);
																	this_this.children('.red-checker').addClass('red-king');
																	
																	//remove black checker
																	$('.checker-cell[data-cell="'+v.data_cell+'"]').empty();
																	
													
																	$('.checker-cell').removeClass('move-checker');
																	$('.checker-cell').removeClass('move-double');
																	double_jump_active = false;
																	//update done counter
																	//alert('Move completed');

																	turn_black = true;
																}else{
																	//move red checker
																	$('.checker-cell[data-cell="'+select_cell+'"]').empty();
																	
																	this_this.append(select_move);
																	$('.checker-cell').removeClass('move-checker');
																	//remove blackchecker
																	$('.checker-cell[data-cell="'+v.data_cell+'"]').empty();
																	
																	//update done counter
																	
																	
																	//odd double jump
																	if ( move_row_count_double == 4) {
																		console.log("no double jump possible");
																		$('.checker-cell').removeClass('move-checker');
																		$('.checker-cell').removeClass('move-double');
																		double_jump_active = false;
																		//update done counter
																		//alert('Move completed');

																		turn_black = true;
																	}else{
																		//for odd
																		double_next_left ="no";
																		double_next_right ="no";
																		$.each(blacks, function(key,val){
																			if(val.row == eval(select_row_count) + 3){
																				
																				if( val.cell == eval(move_checkercell_count) - 1 ){
																					double_next_left = "yes"
																					console.log('left');
																				}
																				if(val.cell == move_checkercell_count ){
																					double_next_right = "yes"
																					console.log('right');
																				}	
																			}
																		});
																		double_jump = 0;
																		if(double_next_left == "yes"){
																			$.each(rows, function(kk,vv){
																				if( vv.row == eval(select_row_count) + 4 ){
																					if (vv.checker_length == 0) {
																						if(move_row_count % 2 != 0){
																							if ( vv.cell == eval(move_checkercell_count) - 1 ) {
																								double_jump++;
																								console.log('you can double jump into cell: '+ vv.cell);
																								$('.checker-cell').removeClass('move-checker');
																								this_this.addClass('move-double');
																								double_jump_active = true;
																							}
																						}
																					}

																				}
																			});
																		}

																		if(double_next_right == "yes"){
																			$.each(rows, function(kk,vv){
																				if( vv.row == eval(select_row_count) + 4 ){
																					if (vv.checker_length == 0) {
																						if(move_row_count % 2 != 0){
																							if ( vv.cell == eval(move_checkercell_count) + 1 ) {
																								double_jump++;
																								console.log('you can double jump into cell: '+ vv.cell);
																								$('.checker-cell').removeClass('move-checker');
																								this_this.addClass('move-double');
																								double_jump_active = true;

																								
																								

																							}
																						}
																					}

																				}
																			});

																		}
																		if (double_next_right == "no" && double_next_left == "no"){
																			$('.checker-cell').removeClass('move-checker');
																			$('.checker-cell').removeClass('move-double');
																			double_jump_active = false;
																			turn_black = true;
																		}
																		if(double_jump === 0){
																			console.log('no valid double jump..ending turn');
																			$('.checker-cell').removeClass('move-checker');
																			$('.checker-cell').removeClass('move-double');
																			double_jump_active = false;
																			turn_black = true;
																		}
																	}
															
																
																	return false;
																}

															}

														}
														
													}
												});
												// if no checker to jump...
												if(jump_count === 0){
													alert('invalid - nothing to jump');
												}

											}else{
												alert('invalid jump position');
											}

										}else{
											alert("invalid - You cannot move to that row");
										}
										
									}

							// if length is not 0 = checker in cell
							}else{
								alert("invalid move - there is already checker there");
							}
						}else{
							//black, red, and no checker to side or behind
							if (move_checker_conflict != 0 ) {
								alert("invalid move - there is already checker there + you must move forward!");
								$('.checker-cell').removeClass('move-checker');
							}else{
								alert("invalid move - you must move forward!");
								$('.checker-cell').removeClass('move-checker');
							}
							
						}
					}

				}else{
					//needs to be red checker to select				
					if (( $(this).children('.checker').length != 0) && ( $(this).children('.red-checker').length != 0) )  {		
						
						if(double_jump_active){
							if( $(this).is('.move-double')){
								$(this).addClass('move-checker');
							}else{
								alert('please click on green cell to double jump!');
							}
						}else{
							//highlight checker to move
							$(this).addClass('move-checker');
						}

						//info about cell selected:
						select_row_count = $(this).parent().attr('data-rows');
						select_row_next = $('[data-rows="'+(eval(select_row_count)+1)+'"]').children().children('.black-checker').length;
						select_checkercell_count = $(this).attr('data-count');
						/*select_row = $(this).parent().attr('id');
						select_checker = $(this).children('.checker').attr('data-checker');*/

						//info to move selected checker
						select_move = $(this).children('.red-checker').get(0).outerHTML;
						/*//used for testing
						select_move_number = $(this).children('.move-count').get(0).outerHTML;*/
						select_cell = $(this).attr('data-cell');
						//get king data
						select_king_exist = $(this).children('.red-king').length;
						select_row_next_king = $('[data-rows="'+ (eval(select_row_count) - 1) +'"]').children().children('.black-checker').length;
						
						
						//allow only 1 to be highlighted
						if ($('.checker-cell').hasClass('move-checker')) {

							$('.checker-cell').removeClass('move-checker');
							
							if(double_jump_active){
								if( $(this).is('.move-double')){
									$(this).addClass('move-checker');
								}else{
									alert('please click on green cell to double jump!');
								}
							}else{
								//highlight checker to move
								$(this).addClass('move-checker');
							}

						}
						
					}else{
						alert("Invalid...Select a red checker please")
					}
				}

			}

			if( $('#red_score').html() == 0 ){
				alert("Black Wins")
			}
			if( $('#black_score').html() == 0 ){
				alert("Red Wins!!")
			}
			
		});

	$(document).on('click', '.reset_button', function(){
		location.reload();
	});	
			

	
	//end ready
	});