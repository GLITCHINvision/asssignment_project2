document.addEventListener('DOMContentLoaded', () => {
    const attendanceCtx = document.getElementById('attendanceChart').getContext('2d');
    const feedbackCtx = document.getElementById('feedbackChart').getContext('2d');
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const workshopTypeSelect = document.getElementById('workshop-type');

    const allData = {
        attendance: [
            { date: '2024-01-01', type: 'coding', value: 50 },
            { date: '2024-01-15', type: 'design', value: 30 },
            { date: '2024-02-10', type: 'coding', value: 60 },
            { date: '2024-02-25', type: 'design', value: 40 },
            { date: '2024-03-05', type: 'coding', value: 70 },
            { date: '2024-03-20', type: 'design', value: 50 },
            {date:'2024-04-01',type:'coding',value:60},
        ],
        feedback: [
            { date: '2024-01-01', type: 'coding', value: 4.5 },
            { date: '2024-01-15', type: 'design', value: 4.8 },
            { date: '2024-02-10', type: 'coding', value: 3.9 },
            { date: '2024-02-25', type: 'design', value: 4.2 },
            { date: '2024-03-05', type: 'coding', value: 4.7 },
            { date: '2024-03-20', type: 'design', value: 4.3 },
            {date:'2024-04-01',type:'coding',value:4.5},

            
        ]
    };

    const filterData = () => {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        const workshopType = workshopTypeSelect.value;

        const filteredAttendance = allData.attendance.filter(item => {
            const itemDate = new Date(item.date);
            return (!startDate || itemDate >= startDate) &&
                   (!endDate || itemDate <= endDate) &&
                   (workshopType === 'all' || item.type === workshopType);
        });

        const filteredFeedback = allData.feedback.filter(item => {
            const itemDate = new Date(item.date);
            return (!startDate || itemDate >= startDate) &&
                   (!endDate || itemDate <= endDate) &&
                   (workshopType === 'all' || item.type === workshopType);
        });

        return { attendance: filteredAttendance, feedback: filteredFeedback };
    };

    const updateCharts = () => {
        const { attendance, feedback } = filterData();
        const attendanceLabels = attendance.map(item => item.date);
        const attendanceValues = attendance.map(item => item.value);
        const feedbackLabels = feedback.map(item => item.date);
        const feedbackValues = feedback.map(item => item.value);

        attendanceChart.data.labels = attendanceLabels;
        attendanceChart.data.datasets[0].data = attendanceValues;
        attendanceChart.update();

        feedbackChart.data.labels = feedbackLabels;
        feedbackChart.data.datasets[0].data = feedbackValues;
        feedbackChart.update();
    };

    const attendanceChart = new Chart(attendanceCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Attendance Rates',
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
            },
        },
    });

    const feedbackChart = new Chart(feedbackCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Feedback Scores',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
            },
        },
    });

    startDateInput.addEventListener('change', updateCharts);
    endDateInput.addEventListener('change', updateCharts);
    workshopTypeSelect.addEventListener('change', updateCharts);

    updateCharts(); 
});
