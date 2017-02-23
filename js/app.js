"use strict";

var app = angular.module('transactions', []);

app.controller('TransactionsCtrl', function($scope, $http, filterFilter)
    {
        $scope.appName = 'FINPAL';
        $scope.transactions = [];
        $scope.transactionSelected = null;
        $scope.propertyName = 'create_at';
        $scope.reverse = true;

        $scope.$watch('transactions', function(){
            $scope.totalTransfers = filterFilter($scope.transactions, { operation_type: 'transfer' }).length;
            $scope.totalInvoices = filterFilter($scope.transactions, { operation_type: 'invoice' }).length;
        });

        $http
            .get('http://private-5d708-interviewfront.apiary-mock.com/transactions')
            .success(function(data){
                console.log(data);
                $scope.transactions = data.transactions;
            });

        $scope.showDetailsTransactions = function(index)
        {
            $scope.transactionSelected = $scope.transactions[index - 1];
        }

        $scope.sortBy = function(propertyName) {

            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
        };

    }
);
