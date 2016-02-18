window && window.setTimeout(function( ) {
    alert('run');
    var Component = React.createClass({
            render: function() {
                return (
                    <div className='item-content'>
                        <div className='item-header'>
                            <h2>{this.props.data.title}</h2>
                        </div>
                        <div className='item-intro'>
                            <p className='intro-line'> </p>
                        </div>
                    </div>
                );
            }
    });
    
    var data = window.reactData;
    console.log(window.reactData);
    for(var i=0,l = data.length; i < l; i++) {
        ReactDOM.render(
          <Component data={data[i]} />,
          document.getElementById('app')
          );
    }
    
}, 2000);
