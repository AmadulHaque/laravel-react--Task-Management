<!DOCTYPE html>
<html>
<head>
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Page Title</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>
<body>
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-md-6">
                <div class="error mb-2">
                   
                </div>
                <form id="postData" method="post">
                    @csrf
                    <div class="mb-3">
                        <label for="task_url" class="form-label">Task URL</label>
                        <select name="task_url[]"  class="task_url form-control" multiple="multiple"></select>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
                <div class="result">
                    
                
                </div>
            </div>
        </div>
    </div>

    <!-- Add necessary scripts here -->
    <!-- Example: -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js" integrity="sha512-3gJwYpMe3QewGELv8k/BX9vcqhryRdzRMxVfq6ngyWXwo03GFEzjsUm8Q7RZcHPHksttq7/GFoxjCVUjkjvPdw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js" integrity="sha512-3gJwYpMe3QewGELv8k/BX9vcqhryRdzRMxVfq6ngyWXwo03GFEzjsUm8Q7RZcHPHksttq7/GFoxjCVUjkjvPdw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script>
       $(document).ready(function(){
            $(".task_url").select2({
                tags: true,
                tokenSeparators: [',', ' ']
            })
            
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });






            $(document).on('submit','#postData',function(e){
                e.preventDefault()
                let formData = new FormData($(this)[0]);
                let result = $('.result');
                result.html(" ")
                $.ajax({
                    type:'post',
                    url: '/store',
                    data:formData,
                    contentType:false,
                    processData:false,
                    success: function(res){
                        console.log(res);
                        if (res.success==false) {
                            $.each(res.errors, function(key, item){
                                $(".error").append(`<div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>${item}</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`)
                            })
                        }else{
                            $.each(res.result, function(key, item){
                                result.append(`<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>${item}</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`)
                            })
                        }
                    },
                    error:function (response){
                        console.log(response);
                    }
                });
            })
       })
    </script>
</body>
</html>
