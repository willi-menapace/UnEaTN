#!/bin/sh

echo "Testing PrevisionDbHelper"
python3 -m unittest test.prevision_db_helper_test_case
echo "Testing MeasuresDbHelper"
python3 -m unittest test.measures_db_helper_test_case
echo "Testing CommandLineParser"
python3 -m unittest test.command_line_parser_test_case
echo "Testing QueuePredictor"
python3 -m unittest test.queue_predictor_test_case
